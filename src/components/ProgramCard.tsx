interface ProgramCardProps {
    title: string;
    description: string;
  }
  
  const ProgramCard = ({ title, description }: ProgramCardProps) => {
    return (
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
        <a href="#" className="text-green-700 hover:underline mt-2 inline-block">Read more</a>
      </div>
    );
  };
  
  export default ProgramCard;
  