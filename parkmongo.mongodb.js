use("parkingappDB");


const ZONE_NAME = "Test Manipal 3";
const PARTS = 6;
const RECT_SIZE_METERS = 350;

const CENTER = {
  lat: 13.352981436576417,
  lng: 74.7924548169888
};

const metersToLat = (m) => m / 111000;
const metersToLng = (m, lat) =>
  m / (111000 * Math.cos(lat * Math.PI / 180));

const halfLat = metersToLat(RECT_SIZE_METERS / 2);
const halfLng = metersToLng(RECT_SIZE_METERS / 2, CENTER.lat);

// 300m × 300m rectangle
const polygon = [
  { lat: CENTER.lat - halfLat, lng: CENTER.lng - halfLng },
  { lat: CENTER.lat - halfLat, lng: CENTER.lng + halfLng },
  { lat: CENTER.lat + halfLat, lng: CENTER.lng + halfLng },
  { lat: CENTER.lat + halfLat, lng: CENTER.lng - halfLng }
];

const lats = polygon.map(p => p.lat);
const lngs = polygon.map(p => p.lng);

const minLat = Math.min(...lats);
const maxLat = Math.max(...lats);
const minLng = Math.min(...lngs);
const maxLng = Math.max(...lngs);

// divide into PARTS (vertical strips)
const slotWidth = (maxLng - minLng) / PARTS;
const slots = [];

for (let i = 0; i < PARTS; i++) {
  const lngStart = minLng + i * slotWidth;
  const lngEnd = lngStart + slotWidth;

  slots.push({
    slotId: `slot-${i + 1}`,
    index: i,
    tag: `P${i + 1}`,
    polygon: [
      { lat: minLat, lng: lngStart },
      { lat: minLat, lng: lngEnd },
      { lat: maxLat, lng: lngEnd },
      { lat: maxLat, lng: lngStart }
    ],
    status: "free",
    occupiedBy: null,
    lastUpdated: new Date()
  });
}

db.parkingzones.insertOne({
  name: ZONE_NAME,
  polygon,
  slots,
  capacity: PARTS,
  available: PARTS,
  parts: PARTS,
  loc: CENTER,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

print(`✅ Zone "${ZONE_NAME}" expanded to ~300m × 300m with ${PARTS} slots`);

