import { useState, useEffect } from 'react';
import { Users, Building2, ArrowRight, Briefcase, GraduationCap, Star, ChevronDown, BookOpen, Medal, TrendingUp, Clock, Heart } from 'lucide-react';
import Footer from "./Footer";
export default function WelcomePage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [statValues, setStatValues] = useState({ companies: 0, students: 0, success: 0 });
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  const testimonials = [
    {
      text: "Grâce à ConnectPro, j'ai décroché un stage dans une entreprise de rêve après seulement 2 semaines !",
      author: "Sophie M., Étudiante en Marketing Digital",
      type: "student"
    },
    {
      text: "Notre processus de recrutement s'est accéléré de 40%. Nous trouvons des candidats parfaitement adaptés à notre culture d'entreprise.",
      author: "Marc D., DRH chez TechVision",
      type: "company"
    },
    {
      text: "La qualité des profils sur cette plateforme est impressionnante. J'ai constitué mon équipe de développement en un temps record.",
      author: "Léa P., Startup Founder",
      type: "company"
    },
    {
      text: "ConnectPro a transformé ma recherche d'alternance. Les entreprises m'ont contacté directement après avoir vu mon profil !",
      author: "Thomas L., Étudiant en Ingénierie",
      type: "student"
    }
  ];

  // Animation des statistiques
  useEffect(() => {
    if (showStats) {
      const interval = setInterval(() => {
        setStatValues(prev => {
          return {
            companies: prev.companies >= 1500 ? 1500 : prev.companies + 15,
            students: prev.students >= 10000 ? 10000 : prev.students + 100,
            success: prev.success >= 85 ? 85 : prev.success + 1
          };
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [showStats]);

  // Rotation automatique des témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <GraduationCap className="text-purple-600" size={24} />,
      title: "Étudiants",
      benefits: ["CV interactif optimisé", "Matching intelligent", "Suggestions personnalisées"]
    },
    {
      icon: <Building2 className="text-purple-600" size={24} />,
      title: "Entreprises",
      benefits: ["Filtrage avancé des candidats", "Statistiques de recrutement", "Interface dédiée aux RH"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200">
      {/* Hero Section avec animation */}
      <div className="relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-300 opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-300 opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-pink-300 opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6 animate-fadeIn">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                ConnectPro
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              La plateforme nouvelle génération qui connecte les <span className="font-semibold text-purple-700">talents étudiants</span> aux <span className="font-semibold text-purple-700">opportunités professionnelles</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center"
              >
                <GraduationCap className="mr-2" size={20} />
                Inscription Étudiants
              </button>
              <button 
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center"
              >
                <Building2 className="mr-2" size={20} />
                Inscription Entreprises
              </button>
            </div>
            
            {/* Animation défilante des mots-clés */}
            <div className="flex overflow-hidden py-4 mb-12 bg-white/30 backdrop-blur-sm rounded-xl">
              <div className="flex animate-scrollX whitespace-nowrap">
                {Array(2).fill(["Stage", "Alternance", "Premier emploi", "Mentorat", "Networking", "Recrutement", "Talent", "Innovation", "Carrière", "Formation"]).flat().map((word, index) => (
                  <span key={index} className="mx-8 text-purple-800 font-medium">
                    {word} <Star size={14} className="inline text-yellow-500" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistiques animées */}
      <div 
        className="bg-white py-12 shadow-inner"
        onMouseEnter={() => setShowStats(true)}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-700 mb-2">{statValues.companies.toLocaleString()}+</div>
              <div className="text-gray-600">Entreprises partenaires</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-700 mb-2">{statValues.students.toLocaleString()}+</div>
              <div className="text-gray-600">Étudiants inscrits</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-700 mb-2">{statValues.success}%</div>
              <div className="text-gray-600">Taux de placement réussi</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Témoignages */}
      <div className="py-16 bg-gradient-to-br from-purple-100 to-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">Ce qu'ils disent de nous</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-12 -translate-y-12 rounded-full ${
                testimonials[testimonialIndex].type === "student" ? "bg-purple-200" : "bg-indigo-200"
              }`}></div>
              
              <div className="text-xl italic text-gray-700 mb-6 relative z-10">
                "{testimonials[testimonialIndex].text}"
              </div>
              
              <div className="flex items-center">
                <div className={`p-3 rounded-full mr-3 ${
                  testimonials[testimonialIndex].type === "student" ? "bg-purple-100" : "bg-indigo-100"
                }`}>
                  {testimonials[testimonialIndex].type === "student" ? 
                    <GraduationCap size={20} className="text-purple-600" /> : 
                    <Building2 size={20} className="text-indigo-600" />
                  }
                </div>
                <div>
                  <div className="font-semibold">{testimonials[testimonialIndex].author}</div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index} 
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === testimonialIndex ? "bg-purple-600" : "bg-gray-300"
                    }`}
                    onClick={() => setTestimonialIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Type Selection */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-4">Rejoignez-nous dès maintenant</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choisissez votre profil pour accéder à une expérience personnalisée et commencer votre parcours
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Étudiants Card */}
            <div 
              className={`rounded-xl bg-white shadow-xl overflow-hidden transition-all duration-500 transform ${
                hoveredCard === 'student' ? 'scale-105 shadow-2xl' : ''
              }`}
              onMouseEnter={() => setHoveredCard('student')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-48 bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <GraduationCap size={80} className="text-white" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-2xl">Espace Étudiants</div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center">
                    <BookOpen size={14} className="mr-1" /> Stages
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center">
                    <Clock size={14} className="mr-1" /> Alternance
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center">
                    <Briefcase size={14} className="mr-1" /> Premier emploi
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center">
                    <Medal size={14} className="mr-1" /> Mentorat
                  </span>
                </div>
                
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Créez un CV interactif qui se démarque</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Recevez des offres personnalisées selon vos compétences</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Participez à des événements de networking exclusifs</span>
                  </li>
                </ul>
                
                <button 
                  className="flex items-center justify-between w-full p-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-x-2"
                  onClick={() => window.location.href = '/client'}
                >
                  <span>Accéder à mon espace étudiant</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            
            {/* Entreprises Card */}
            <div 
              className={`rounded-xl bg-white shadow-xl overflow-hidden transition-all duration-500 transform ${
                hoveredCard === 'company' ? 'scale-105 shadow-2xl' : ''
              }`}
              onMouseEnter={() => setHoveredCard('company')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
                <Building2 size={80} className="text-white" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-2xl">Espace Entreprises</div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center">
                    <Users size={14} className="mr-1" /> Recrutement
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center">
                    <TrendingUp size={14} className="mr-1" /> Talent Acquisition
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center">
                    <Heart size={14} className="mr-1" /> Marque Employeur
                  </span>
                </div>
                
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Accédez à un vivier de talents qualifiés et motivés</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Publiez des offres ciblées avec matching intelligent</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Valorisez votre marque employeur auprès des étudiants</span>
                  </li>
                </ul>
                
                <button 
                  className="flex items-center justify-between w-full p-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-x-2"
                  onClick={() => window.location.href = '/Compagny/signup'}
                > 
                  <span>Accéder à mon espace entreprise</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Floating support button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
      
      {/* Add animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scrollX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-scrollX {
          animation: scrollX 20s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}