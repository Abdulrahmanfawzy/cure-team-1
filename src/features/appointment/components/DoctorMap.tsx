interface DoctorMapProps {
  latitude: number;
  longitude: number;
}

export default function DoctorMap({ latitude, longitude }: DoctorMapProps) {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    longitude - 0.02
  },${latitude - 0.02},${longitude + 0.02},${
    latitude + 0.02
  }&layer=mapnik&marker=${latitude},${longitude}`;

  console.log(osmUrl);

  return (
    <div className="h-80 overflow-hidden rounded-2xl">
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <iframe
          src={osmUrl}
          className="pointer-events-none h-full w-full border-0"
          loading="lazy"
          title="Doctor location"
        />
      </a>
    </div>
  );
}
