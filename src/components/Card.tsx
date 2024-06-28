type CardProps = {
    title: string;
    imageSrc: string;
    description: string;
  };
  
  export default function Card({ title, imageSrc, description }: CardProps) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
      </div>
    );
  }
  