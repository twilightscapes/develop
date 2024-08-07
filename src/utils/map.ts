/// <reference types="@types/googlemaps" />

interface PolygonPath extends google.maps.MVCArray<google.maps.LatLng> {}

let map: google.maps.Map | undefined;
let drawingManager: google.maps.drawing.DrawingManager | undefined;
let drawnPolygons: google.maps.Polygon[] = [];
let marker: google.maps.Marker | null = null;
let autocomplete: google.maps.places.Autocomplete | undefined;

const BASE_RATES = [
    { maxArea: 1500, rate: 0.025 },
    { maxArea: 3000, rate: 0.026 },
    { maxArea: Infinity, rate: 0.027 }
];

const SQ_METERS_TO_SQ_FEET = 10.7639;
const MIN_AREA_SQ_FEET = 100;
const MAX_AREA_SQ_FEET = 10000;

function initMap(): void {
    console.log('Initializing map...');
    if (typeof google === 'undefined') {
        console.error('Google Maps API is not loaded.');
        return;
    }

    map = new google.maps.Map(document.getElementById('map')!, {
        center: { lat: 30.38, lng: -89.03 },
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        scaleControl: false,
        zoomControl: false,
        tilt: 0
    });

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        },
        polygonOptions: {
            editable: true,
            draggable: true
        }
    });
    
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event: google.maps.drawing.OverlayCompleteEvent) => {
        console.log('Overlay complete event:', event);
        if (event.overlay instanceof google.maps.Polygon) {
            console.log('Polygon added:', event.overlay);
            drawnPolygons.push(event.overlay);
            event.overlay.getPath().addListener('set_at', updateCalculations);
            event.overlay.getPath().addListener('insert_at', updateCalculations);
            event.overlay.getPath().addListener('remove_at', updateCalculations);
            updateCalculations();
        } else {
            console.warn('Not a polygon:', event.overlay);
        }
    });

    map.addListener('center_changed', updateQueryString);
    map.addListener('zoom_changed', updateQueryString);

    document.getElementById('drawPolygonControl')!.addEventListener('click', () => {
        drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        document.getElementById('map')!.style.cursor = 'crosshair';
    });

    document.getElementById('clearButton')!.addEventListener('click', clearDrawnPolygons);
    document.getElementById('dogSelect')!.addEventListener('change', updateCalculations);

    const input = document.getElementById('address') as HTMLInputElement;
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete?.getPlace();
        if (!place || !place.geometry) {
            console.error("Autocomplete's returned place contains no geometry");
            return;
        }
        map!.setCenter(place.geometry.location!);
        map!.setZoom(21);
        if (marker) marker.setMap(null);
        marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.formatted_address
        });
        updateQueryString();
    });

    document.getElementById('address')!.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            // Optionally handle manual address input if needed
        }
    });
}

function updateQueryString(): void {
    if (!map) return;
    const lat = map.getCenter().lat();
    const lng = map.getCenter().lng();
    const zoom = map.getZoom();
    const queryString = `?lat=${lat}&lng=${lng}&zoom=${zoom}`;
    window.history.replaceState({}, '', queryString);
}

function updateCalculations(): void {
    const areaElement = document.getElementById('area')!;
    const selectElement = document.getElementById('dogSelect') as HTMLSelectElement;
    let totalAreaSqFeet = 0;

    drawnPolygons.forEach(polygon => {
        const path = polygon.getPath() as PolygonPath;
        const areaSqMeters = google.maps.geometry.spherical.computeArea(path);
        const areaSqFeet = areaSqMeters * SQ_METERS_TO_SQ_FEET;
        totalAreaSqFeet += areaSqFeet;
    });

    if (totalAreaSqFeet < MIN_AREA_SQ_FEET) {
        areaElement.innerHTML = `<div class='notification'>Area is too small. Minimum is ${MIN_AREA_SQ_FEET} sq feet.</div>`;
        areaElement.style.display = 'block';
        return;
    }

    const selectedRate = BASE_RATES.find(rate => totalAreaSqFeet <= rate.maxArea);
    const cost = totalAreaSqFeet * (selectedRate ? selectedRate.rate : 0);

    areaElement.innerHTML = `Total area: ${totalAreaSqFeet.toFixed(2)} sq feet<br>Cost: $${cost.toFixed(2)}`;
    areaElement.style.display = 'block';
}

function clearDrawnPolygons(): void {
    drawnPolygons.forEach(polygon => polygon.setMap(null));
    drawnPolygons = [];
    document.getElementById('area')!.style.display = 'none';
}

if (typeof google !== 'undefined') {
    initMap();
} else {
    window.initMap = initMap;
}
