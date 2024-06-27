const HeroSection = () => {
    return (
      <section className="bg-cover bg-center h-96 text-white" style={{ backgroundImage: "url('/path-to-your-hero-image.jpg')" }}>
        <div className="container mx-auto flex items-center justify-center h-full px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to NCSU Agriculture Department</h2>
            <p className="text-xl mb-8">Leading the way in agricultural research and education.</p>
            <a href="#" className="bg-green-700 px-6 py-2 rounded-full hover:bg-green-600">Learn More</a>
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  