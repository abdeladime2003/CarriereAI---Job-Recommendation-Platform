import { useState, useEffect } from 'react';
import { 
  Search, MapPin, Briefcase, Filter, Star, Calendar, 
  ChevronDown, Moon, Sun, X, MessageSquare, 
  Building, Sliders, Bell, User, Menu, Bookmark, 
  ArrowUpRight, Zap, TrendingUp, Clock, ChevronRight
} from 'lucide-react';

// Données de simulation améliorées pour une plateforme professionnelle
const jobsData = [
  {
    id: 1,
    title: "Développeur Frontend React Senior",
    company: "TechVision Maroc",
    logo: "/api/placeholder/40/40",
    location: "Casablanca",
    type: "CDI",
    salary: "18,000 - 25,000 MAD",
    experience: "3-5 ans",

    featured: true,
    skills: ["React", "TypeScript", "NextJS", "TailwindCSS"],
    coordinates: { x: 120, y: 240 },
    description: "Notre client, leader dans le secteur financier, recherche un développeur React expérimenté pour diriger le développement d'applications critiques et former une équipe junior.",
    date: "Publié il y a 2 jours",
    benefits: ["Télétravail 3j/semaine", "Mutuelle internationale", "Formation continue"]
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "DataMinds Intelligence",
    logo: "/api/placeholder/40/40",
    location: "Rabat",
    type: "CDI",
    salary: "20,000 - 28,000 MAD",
    experience: "3-5 ans",
    featured: true,
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    coordinates: { x: 105, y: 215 },
    description: "Rejoignez notre équipe d'experts en intelligence artificielle pour développer des solutions prédictives innovantes pour nos clients internationaux dans les secteurs bancaire et télécoms.",
    date: "Publié il y a 5 jours",
    benefits: ["Prime de performance", "Package international", "Laboratoire IA"]
  },
  {
    id: 3,
    title: "Ingénieur DevOps / SRE",
    company: "CloudNative Solutions",
    logo: "/api/placeholder/40/40",
    location: "Tanger",
    type: "CDI",
    salary: "22,000 - 30,000 MAD",
    experience: "4+ ans",
    featured: false,
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    coordinates: { x: 90, y: 180 },
    description: "Dans le cadre de notre expansion au Maroc, nous recherchons un expert DevOps pour gérer notre infrastructure cloud et optimiser nos pipelines de déploiement continu.",
    date: "Publié aujourd'hui",
    benefits: ["Équipement haut de gamme", "Horaires flexibles", "Événements tech"]
  },
  {
    id: 4,
    title: "Chef de Projet Digital",
    company: "Innovate Agency",
    logo: "/api/placeholder/40/40",
    location: "Casablanca",
    type: "CDI",
    salary: "16,000 - 22,000 MAD",
    experience: "2-4 ans",
    featured: false,
    skills: ["Gestion de projet", "Agile", "Marketing Digital"],
    coordinates: { x: 125, y: 245 },
    description: "Vous coordonnerez les équipes techniques et créatives pour livrer des projets web et mobiles haut de gamme pour nos clients internationaux.",
    date: "Publié il y a 3 jours",
    benefits: ["Formation certifiante", "Prime de résultat", "Espaces de travail modernes"]
  },
  {
    id: 5,
    title: "Développeur Full Stack (Vue.js/Node.js)",
    company: "WebSphere Solutions",
    logo: "/api/placeholder/40/40",
    location: "Marrakech",
    type: "CDD",
    salary: "15,000 - 20,000 MAD",
    experience: "2-3 ans",
    featured: false,
    skills: ["Vue.js", "Node.js", "MongoDB", "Express"],
    coordinates: { x: 140, y: 270 },
    description: "Participez au développement d'une plateforme e-commerce de nouvelle génération pour le marché africain.",
    date: "Publié il y a 1 semaine",
    benefits: ["Cadre de travail exceptionnel", "Tickets restaurant", "Évènements team building"]
  }
];

// Données étendues des villes avec statistiques de marché
const cities = [
  { name: "Casablanca", count: 46, growth: "+15%", avgSalary: "19,500 MAD", inDemand: "React", coordinates: { x: 120, y: 240 } },
  { name: "Rabat", count: 28, growth: "+8%", avgSalary: "17,800 MAD", inDemand: "Data Science", coordinates: { x: 105, y: 215 } },
  { name: "Marrakech", count: 18, growth: "+22%", avgSalary: "16,500 MAD", inDemand: "Full Stack", coordinates: { x: 140, y: 270 } },
  { name: "Tanger", count: 22, growth: "+27%", avgSalary: "18,200 MAD", inDemand: "DevOps", coordinates: { x: 90, y: 180 } },
  { name: "Agadir", count: 12, growth: "+5%", avgSalary: "15,500 MAD", inDemand: "Frontend", coordinates: { x: 80, y: 320 } },
  { name: "Fès", count: 15, growth: "+10%", avgSalary: "16,200 MAD", inDemand: "Java", coordinates: { x: 160, y: 200 } },
  { name: "Meknès", count: 8, growth: "+7%", avgSalary: "15,800 MAD", inDemand: "PHP", coordinates: { x: 150, y: 210 } },
];

// Données pour les statistiques du marché
const marketStats = [
  { title: "Moyenne salariale IT", value: "18,500 MAD", trend: "+7.5%", period: "vs 2023" },
  { title: "Compétences les plus demandées", value: "React, Data Science, Cloud", trend: "Stable", period: "depuis 3 mois" },
  { title: "Délai moyen de recrutement", value: "45 jours", trend: "-5 jours", period: "vs trimestre précédent" },
  { title: "Mobilité des talents", value: "35%", trend: "+8%", period: "cherchent à changer" },
];

export default function ProfessionalJobPlatform() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    type: 'all',
    experience: 'all',
    salary: 'all',
    skills: []
  });

  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: "Bonjour ! Je suis votre assistant de recherche personnalisé. Comment puis-je vous aider dans votre recherche d'emploi aujourd'hui ?" }
  ]);

  // Filtrer les emplois en fonction des critères sélectionnés
  useEffect(() => {
    let jobs = jobsData;
    
    if (selectedCity) {
      jobs = jobs.filter(job => job.location === selectedCity);
    }
    
    if (activeFilters.type !== 'all') {
      jobs = jobs.filter(job => job.type === activeFilters.type);
    }
    
    if (activeFilters.experience !== 'all') {
      const expMin = parseInt(activeFilters.experience.split('-')[0]);
      jobs = jobs.filter(job => {
        const jobExpMin = parseInt(job.experience.split('-')[0]);
        return jobExpMin >= expMin;
      });
    }

    if (activeFilters.salary !== 'all') {
      const salaryMin = parseInt(activeFilters.salary.split('-')[0].replace(/\D/g, ''));
      jobs = jobs.filter(job => {
        const jobSalaryMin = parseInt(job.salary.split('-')[0].replace(/\D/g, ''));
        return jobSalaryMin >= salaryMin;
      });
    }
    
    if (activeFilters.skills.length > 0) {
      jobs = jobs.filter(job => 
        activeFilters.skills.some(skill => 
          job.skills.includes(skill)
        )
      );
    }
    
    setFilteredJobs(jobs);
  }, [selectedCity, activeFilters]);

  // Gérer la soumission des messages du chatbot
  const handleChatSubmit = (e) => {
    e.preventDefault();
    
    if (!chatInput.trim()) return;
    
    // Ajouter le message de l'utilisateur à l'historique
    setChatHistory([...chatHistory, { sender: 'user', message: chatInput }]);
    
    // Simuler une réponse intelligente du chatbot
    setTimeout(() => {
      let botResponse = "";
      
      if (chatInput.toLowerCase().includes('cdi')) {
        botResponse = "J'ai filtré les offres en CDI pour vous. Souhaitez-vous préciser une ville ou un niveau d'expérience ?";
        setActiveFilters({...activeFilters, type: 'CDI'});
      } else if (chatInput.toLowerCase().includes('freelance') || chatInput.toLowerCase().includes('indépendant')) {
        botResponse = "Je recherche les opportunités freelance disponibles. Y a-t-il un secteur particulier qui vous intéresse ?";
        setActiveFilters({...activeFilters, type: 'Freelance'});
      } else if (chatInput.toLowerCase().includes('casablanca') || chatInput.toLowerCase().includes('casa')) {
        botResponse = "Voici les offres disponibles à Casablanca. Ce marché est particulièrement dynamique avec une croissance de 15% des offres ce trimestre.";
        setSelectedCity("Casablanca");
      } else if (chatInput.toLowerCase().includes('salaire') || chatInput.toLowerCase().includes('rémunération')) {
        botResponse = "Quelle fourchette de salaire recherchez-vous ? Les salaires moyens dans l'IT au Maroc varient entre 15,000 et 30,000 MAD selon l'expérience et la spécialisation.";
      } else if (chatInput.toLowerCase().includes('react') || chatInput.toLowerCase().includes('développeur front')) {
        botResponse = "J'ai trouvé plusieurs postes en React qui pourraient vous intéresser. Les développeurs React sont très demandés actuellement avec des salaires supérieurs à la moyenne du marché.";
        setActiveFilters({...activeFilters, skills: [...activeFilters.skills, 'React']});
      } else {
        botResponse = "Merci pour cette information. Pourriez-vous préciser le type de poste, la localisation ou les technologies qui vous intéressent particulièrement ?";
      }
      
      setChatHistory(prev => [...prev, { sender: 'bot', message: botResponse }]);
    }, 600);
    
    setChatInput("");
  };

  // Ouvrir le panneau de détail d'une offre
  const openJobDetail = (job) => {
    setSelectedJob(job);
    setShowDetailPanel(true);
  };

  return (
    <div className={`flex flex-col h-screen w-full overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      <header className={`px-6 py-3 flex justify-between items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} bg-white dark:bg-gray-800 shadow-sm`}>
        <div className="flex items-center">
          <h1 className="text-xl font-bold flex items-center">
            <span className="text-blue-600 mr-2">
              <TrendingUp size={24} />
            </span> 
            <span className="hidden md:inline">TalentConnect</span> 
            <span className="ml-2 text-sm text-blue-600 font-normal hidden lg:inline">| La plateforme des talents tech au Maroc</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Rechercher un poste, une entreprise..."
              className={`pl-9 pr-4 py-2 rounded-lg text-sm border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} w-64`}
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <button 
            onClick={() => setShowChatbot(!showChatbot)}
            className="flex items-center p-2 md:px-3 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm"
          >
            <MessageSquare size={18} className="mr-0 md:mr-2" />
            <span className="hidden md:inline">Assistant IA</span>
          </button>
          
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <div className="flex items-center ml-2">
            <span className="hidden md:inline-block h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
              <User size={16} />
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Carte et statistiques */}
        <div className={`hidden md:block w-2/5 lg:w-1/3 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="h-full flex flex-col">
            
            {/* Statistiques du marché */}
            <div className={`p-4 flex-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <TrendingUp size={18} className="mr-2 text-blue-600" />
                Statistiques du Marché IT
              </h2>
              
              <div className="space-y-4">
                {marketStats.map((stat, index) => (
                  <div key={index} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stat.title}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        stat.trend.includes('+') 
                          ? 'bg-green-100 text-green-800' 
                          : stat.trend.includes('-') 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {stat.trend}
                      </span>
                    </div>
                    <div className="mt-1 flex justify-between items-end">
                      <span className="text-lg font-bold">{stat.value}</span>
                      <span className="text-xs text-gray-500">{stat.period}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedCity && (
                <div className={`mt-4 p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-blue-200'}`}>
                  <h3 className="font-medium flex items-center text-blue-600">
                    <Zap size={16} className="mr-1" />
                    Focus sur {selectedCity}
                  </h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Croissance des offres: <span className="font-medium text-green-500">{cities.find(c => c.name === selectedCity)?.growth}</span></p>
                    <p>Salaire moyen: <span className="font-medium">{cities.find(c => c.name === selectedCity)?.avgSalary}</span></p>
                    <p>Compétence la plus demandée: <span className="font-medium">{cities.find(c => c.name === selectedCity)?.inDemand}</span></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Filtre et liste des offres */}
        <div className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${showDetailPanel ? 'hidden md:flex' : ''}`}>
          {/* Filtres */}
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} bg-white dark:bg-gray-800 shadow-sm`}>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold flex items-center">
                <Filter size={18} className="mr-2 text-blue-600" />
                Filtres Intelligents
              </h2>
              
              <div className="flex items-center">
                {selectedCity && (
                  <button 
                    onClick={() => setSelectedCity(null)}
                    className={`flex items-center px-2 py-1 rounded-md text-sm mr-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  >
                    {selectedCity} <X size={14} className="ml-1" />
                  </button>
                )}
                
                <button 
                  onClick={() => setActiveFilters({type: 'all', experience: 'all', salary: 'all', skills: []})} 
                  className="text-xs text-blue-600 hover:underline"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
            
            {/* Filtres sur desktop */}
            <div className="hidden md:flex space-x-3">
              <div className="w-1/4">
                <label className="block text-xs font-medium mb-1">Type de contrat</label>
                <select 
                  className={`w-full p-2 rounded-md border text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  value={activeFilters.type}
                  onChange={(e) => setActiveFilters({...activeFilters, type: e.target.value})}
                >
                  <option value="all">Tous les contrats</option>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Stage">Stage</option>
                </select>
              </div>
              
              <div className="w-1/4">
                <label className="block text-xs font-medium mb-1">Expérience</label>
                <select 
                  className={`w-full p-2 rounded-md border text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  value={activeFilters.experience}
                  onChange={(e) => setActiveFilters({...activeFilters, experience: e.target.value})}
                >
                  <option value="all">Toute expérience</option>
                  <option value="0-1">Débutant (0-1 an)</option>
                  <option value="2-3">Intermédiaire (2-3 ans)</option>
                  <option value="4-5">Confirmé (4-5 ans)</option>
                  <option value="6+">Senior (6+ ans)</option>
                </select>
              </div>
              
              <div className="w-1/4">
                <label className="block text-xs font-medium mb-1">Salaire</label>
                <select 
                  className={`w-full p-2 rounded-md border text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  value={activeFilters.salary}
                  onChange={(e) => setActiveFilters({...activeFilters, salary: e.target.value})}
                >
                  <option value="all">Tous les salaires</option>
                  <option value="10000-15000">10,000 - 15,000 MAD</option>
                  <option value="15000-20000">15,000 - 20,000 MAD</option>
                  <option value="20000-25000">20,000 - 25,000 MAD</option>
                  <option value="25000+">25,000+ MAD</option>
                </select>
              </div>
              
              <div className="w-1/4">
                <label className="block text-xs font-medium mb-1">Compétences principales</label>
                <select 
                  className={`w-full p-2 rounded-md border text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  onChange={(e) => {
                    if (e.target.value !== 'all') {
                      if (!activeFilters.skills.includes(e.target.value)) {
                        setActiveFilters({...activeFilters, skills: [...activeFilters.skills, e.target.value]});
                      }
                    } else {
                      setActiveFilters({...activeFilters, skills: []});
                    }
                  }}
                  value="all"
                >
                  <option value="all">Toutes les compétences</option>
                  <option value="React">React</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="AWS">AWS</option>
                  <option value="DevOps">DevOps</option>
                  <option value="TypeScript">TypeScript</option>
                </select>
              </div>
            </div>
            
            {/* Filtres sur mobile */}
            <div className="flex md:hidden justify-between">
              <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={`flex items-center p-2 rounded-md text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <Sliders size={16} className="mr-1" />
                Filtres
              </button>
              
              <button 
                onClick={() => setShowChatbot(!showChatbot)}
                className="flex items-center p-2 bg-blue-600 text-white rounded-md text-sm"
              >
                <MessageSquare size={16} className="mr-1" />
                Assistant
              </button>
            </div>
            
            {/* Affichage des compétences sélectionnées */}
            {activeFilters.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {activeFilters.skills.map(skill => (
                  <span 
                    key={skill}
                    className={`flex items-center text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
                  >
                    {skill}
                    <button 
                      onClick={() => setActiveFilters({
                        ...activeFilters, 
                        skills: activeFilters.skills.filter(s => s !== skill)
                      })}
                      className="ml-1"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {/* Affichage des filtres mobiles */}
            {showMobileFilters && (
              <div className="mt-3 space-y-3 md:hidden">
                <div>
                  <label className="block text-xs font-medium mb-1">Type de contrat</label>
                  <select 
                    className={`w-full p-2 rounded-md border text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    value={activeFilters.type}
                    onChange={(e) => setActiveFilters({...activeFilters, type: e.target.value})}
                  >
                    <option value="all">Tous les contrats</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Stage">Stage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Salaire</label>
                  <select 
                    className={`w-full p-2 rounded-md border text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    value={activeFilters.salary}
                    onChange={(e) => setActiveFilters({...activeFilters, salary: e.target.value})}
                  >
                    <option value="all">Tous les salaires</option>
                    <option value="10000-15000">10,000 - 15,000 MAD</option>
                    <option value="15000-20000">15,000 - 20,000 MAD</option>
                    <option value="20000-25000">20,000 - 25,000 MAD</option>
                    <option value="25000+">25,000+ MAD</option>
                  </select>
                </div>
              </div>
            )}
            
            <div className="mt-3 flex justify-between items-center">
              <span className="font-medium text-blue-500 text-sm">
                <Briefcase className="inline-block mr-1" size={16} />
                {filteredJobs.length} offre{filteredJobs.length !== 1 ? 's' : ''} correspondant à vos critères
              </span>
              
              <div className="flex items-center">
                <span className="mr-2 text-sm hidden md:inline">Trier par:</span>
                <select className={`text-sm p-1 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                  <option>Pertinence</option>
                  <option>Date (récent)</option>
                  <option>Salaire (décroissant)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Liste des offres */}
          <div className="flex-1 overflow-y-auto">
            {filteredJobs.length > 0 ? (
              <div className="p-4 space-y-4">
                {filteredJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className={`rounded-xl p-4 transition-all duration-300 hover:shadow-lg cursor-pointer border-l-4 ${
                      job.compatibility > 90 
                        ? 'border-l-red-500' 
                        : job.compatibility > 80 
                          ? 'border-l-amber-500' 
                          : 'border-l-emerald-500'
                    } ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white shadow hover:shadow-md'}`}
                    onClick={() => openJobDetail(job)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                       
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-bold">{job.title}</h3>
                            {job.featured && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                Premium
                              </span>
                            )}
                          </div>
                          <p className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <Building size={14} className="mr-1" />
                            <span className="mr-3">{job.company}</span>
                            <MapPin size={14} className="mr-1" />
                            <span>{job.location}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className={`px-2 py-1 rounded-md text-xs font-medium mb-2 ${
                          job.type === 'CDI' 
                            ? 'bg-blue-100 text-blue-800' 
                            : job.type === 'CDD' 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-purple-100 text-purple-800'
                        }`}>
                          {job.type}
                        </div>
                        <div className="text-sm font-medium">
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                        {job.description}
                      </p>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map(skill => (
                        <span 
                          key={skill} 
                          className={`text-xs px-2 py-1 rounded-full ${
                            darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`ml-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {job.date}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                       
                        
                        <button className={`flex items-center text-xs font-medium px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                          <span className="hidden md:inline">Voir détails</span>
                          <span className="md:hidden">Détails</span>
                          <ChevronRight size={14} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center h-full ${darkMode ? 'text-gray-400' : 'text-gray-500'} p-4`}>
                <Briefcase size={48} className="mb-3 opacity-50" />
                <p className="text-lg font-medium">Aucune offre correspondant à vos critères</p>
                <p className="text-sm mt-2 text-center">Essayez d'élargir votre recherche ou contactez notre assistant IA pour des recommandations personnalisées</p>
                <button 
                  onClick={() => {
                    setActiveFilters({type: 'all', experience: 'all', salary: 'all', skills: []});
                    setSelectedCity(null);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Panneau de détail d'une offre */}
        {showDetailPanel && selectedJob && (
          <div className={`w-full md:w-1/2 border-l flex flex-col ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">Détails de l'offre</h2>
              <button 
                onClick={() => setShowDetailPanel(false)}
                className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-start mb-6">
             
                <div>
                  <h1 className="text-xl font-bold">{selectedJob.title}</h1>
                  <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedJob.company}</p>
                  <div className="flex items-center mt-1">
                    <MapPin size={16} className="mr-1 text-blue-500" />
                    <span>{selectedJob.location}</span>
                    <span className="mx-2">•</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      selectedJob.type === 'CDI' 
                        ? 'bg-blue-100 text-blue-800' 
                        : selectedJob.type === 'CDD' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-purple-100 text-purple-800'
                    }`}>{selectedJob.type}</span>
                  </div>
                </div>
              </div>
              
              <div className={`grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div>
                  <p className="text-sm text-gray-500">Salaire</p>
                  <p className="font-semibold">{selectedJob.salary}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expérience</p>
                  <p className="font-semibold">{selectedJob.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date de publication</p>
                  <p className="font-semibold">{selectedJob.date.replace('Publié ', '')}</p>
                </div>
                <div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description du poste</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedJob.description}
                </p>
                <p className="mt-2 text-sm">
                  En tant que {selectedJob.title}, vous serez amené à travailler sur des projets innovants et challengeants. 
                  Vous rejoindrez une équipe dynamique et passionnée, dans un environnement qui valorise la créativité et l'excellence technique.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Compétences requises</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map(skill => (
                    <span 
                      key={skill} 
                      className={`px-3 py-1 rounded-full text-sm ${
                        darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Avantages</h3>
                <ul className="space-y-2">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Entreprise</h3>
                <p className="text-sm">
                  {selectedJob.company} est une entreprise dynamique et innovante dans le secteur technologique au Maroc.
                  Avec une culture orientée vers l'excellence et l'innovation, nous offrons un environnement de travail
                  stimulant où chaque talent peut s'épanouir et développer son potentiel.
                </p>
              </div>
            </div>
            
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex space-x-3">
                <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center font-medium">
                  <ArrowUpRight size={18} className="mr-2" />
                  Postuler maintenant
                </button>
                <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Chatbot assistant IA */}
      {showChatbot && (
        <div className={`fixed bottom-6 right-6 w-80 md:w-96 rounded-xl shadow-xl overflow-hidden z-50 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <div className="p-3 bg-blue-600 text-white flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare size={18} className="mr-2" />
              <span className="font-medium">Assistant Carrière IA</span>
            </div>
            <button onClick={() => setShowChatbot(false)}>
              <X size={18} />
            </button>
          </div>
          
          <div className="h-80 overflow-y-auto p-3">
            {chatHistory.map((chat, idx) => (
              <div 
                key={idx} 
                className={`mb-3 max-w-[80%] p-2 rounded-lg ${
                  chat.sender === 'bot' 
                    ? `${darkMode ? 'bg-gray-700' : 'bg-blue-100'} mr-auto` 
                    : `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} ml-auto`
                }`}
              >
                {chat.message}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-200">
            <div className="flex">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Décrivez le poste idéal pour vous..." 
                className={`flex-1 p-2 rounded-l-lg border-t border-l border-b ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg"
              >
                →
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Notre assistant utilise l'IA pour vous aider à trouver l'emploi idéal
            </p>
          </form>
        </div>
      )}
      
      {/* Footer avec liens rapides et stats */}
      <footer className={`p-3 text-sm border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex justify-between items-center">
          <div className="hidden md:flex space-x-6">
            <button className="text-blue-600 hover:underline">Tendances du marché</button>
            <button className="text-blue-600 hover:underline">Guide des salaires 2025</button>
            <button className="text-blue-600 hover:underline">Conseils d'entretien</button>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-8">
            <div className="flex items-center">
              <span className="font-bold text-blue-600">
                <TrendingUp size={16} className="inline mr-1" />
              </span>
              <span className="hidden md:inline">+243 nouvelles offres cette semaine</span>
              <span className="md:hidden">+243 offres</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-blue-600">
                <Zap size={16} className="inline mr-1" />
              </span>
              <span className="hidden md:inline">React, IA et Cloud: compétences les plus demandées</span>
              <span className="md:hidden">React, IA, Cloud</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}