import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
  Building, 
  PlusCircle, 
  Users, 
  FileText,
  Clock, 
  BarChart3, 
  Edit, 
  Trash2, 
  Play,
  FileSearch,
  CheckCircle,
  XCircle,
  BellRing,
  Mail,
  MessageSquare,
  GraduationCap,
  Phone,
  Handshake,
  Star,
  Lock,
  Search,
  Filter,
  ChevronRight,
  PieChart,
  CheckSquare
} from "lucide-react";

const EnterpriseDashboard = () => {
  const navigate = useNavigate();
  const company_name = localStorage.getItem("user").replace(/"/g, '')
  const [companyData] = useState({
    name: company_name , 
    profileCompletion: 70,
    pendingApplications: 12,
    activeOffers: 3,
    averageResponseTime: "18h",
    engagementRate: "74%",
    offers: [
      { id: 1, title: "Développeur Full Stack", applications: 8, status: "active", date: "06 mai 2025" },
      { id: 2, title: "Assistant RH", applications: 4, status: "draft", date: "05 mai 2025" },
      { id: 3, title: "Chef de projet", applications: 0, status: "expiring", date: "22 avr 2025" }
    ],
    recentApplications: [
      { id: 1, name: "Sarah M.", position: "Développeuse React", matchRate: "92%" },
      { id: 2, name: "Jean L.", position: "Assistant RH", matchRate: "85%" }
    ],
    notifications: [
      { id: 1, type: "application", text: "5 nouvelles candidatures non lues", icon: <BellRing className="w-5 h-5" /> },
      { id: 2, type: "offer", text: "Votre offre 'Chef de projet' est bientôt expirée", icon: <Mail className="w-5 h-5" /> },
      { id: 3, type: "message", text: "Un candidat vous a répondu", icon: <MessageSquare className="w-5 h-5" /> }
    ]
  });

  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState("");
  
  // Obtenir le statut en français avec la bonne couleur
  const getStatusInfo = (status) => {
    switch (status) {
      case "active":
        return { text: "Active", color: "bg-green-100 text-green-800" };
      case "draft":
        return { text: "Brouillon", color: "bg-gray-100 text-gray-800" };
      case "expiring":
        return { text: "Expiration proche", color: "bg-yellow-100 text-yellow-800" };
      default:
        return { text: status, color: "bg-blue-100 text-blue-800" };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <Building className="w-8 h-8 text-blue-600 mr-3" />
            <span className="self-center text-xl font-semibold whitespace-nowrap">RH Connect</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
              <BellRing className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                TS
              </div>
              <span className="font-medium text-sm hidden md:block">{companyData.name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed top-[61px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-6 overflow-y-auto bg-white border-r border-gray-200">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-3 text-base font-medium text-blue-600 rounded-lg bg-blue-50 group">
                <PieChart className="w-5 h-5 text-blue-600" />
                <span className="ml-3">Tableau de bord</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 group">
                <FileText className="w-5 h-5 text-gray-500" />
                <span className="ml-3">Offres d'emploi</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 group">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="ml-3">Candidatures</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 group">
                <BarChart3 className="w-5 h-5 text-gray-500" />
                <span className="ml-3">Statistiques</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 group">
                <Building className="w-5 h-5 text-gray-500" />
                <span className="ml-3">Profil entreprise</span>
              </a>
            </li>
          </ul>

          <div className="pt-5 mt-5 space-y-2 border-t border-gray-200">
            <a href="#" className="flex items-center p-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 group">
              <GraduationCap className="w-5 h-5 text-gray-500" />
              <span className="ml-3">Ressources</span>
            </a>
            <a href="#" className="flex items-center p-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 group">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="ml-3">Support</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="p-4 sm:ml-64 pt-20">
        <div className="p-4 mb-8">
          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Bienvenue {companyData.name} 👋
              </h1>
              <p className="text-gray-600">
                Prêt à trouver vos prochains talents ? Voici les prochaines étapes.
              </p>
            </div>
          <button
      className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      onClick={() => navigate("/Compagny/post_job")}
    >
      <PlusCircle className="w-5 h-5" />
      Publier une offre
    </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium">Candidatures en attente</h3>
                <span className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">{companyData.pendingApplications}</p>
                <p className="text-sm text-green-600 font-medium">+4 cette semaine</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium">Offres actives</h3>
                <span className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                </span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">{companyData.activeOffers}</p>
                <p className="text-sm text-blue-600 font-medium">sur 5 autorisées</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium">Temps moyen de réponse</h3>
                <span className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                </span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">{companyData.averageResponseTime}</p>
                <p className="text-sm text-green-600 font-medium">-2h vs mois dernier</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-500 text-sm font-medium">Taux d'engagement</h3>
                <span className="p-2 bg-yellow-100 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-yellow-600" />
                </span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">{companyData.engagementRate}</p>
                <p className="text-sm text-green-600 font-medium">+3% ce mois-ci</p>
              </div>
            </div>
          </div>

          {/* Main content sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* My Job Offers */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Mes Offres d'Emploi</h2>
                  
                  {/* Search and filter */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Rechercher..." 
                        className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
                    </div>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Jobs list */}
                <div className="divide-y divide-gray-200">
                  {companyData.offers.map((offer) => {
                    const status = getStatusInfo(offer.status);
                    
                    return (
                      <div key={offer.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-base font-medium text-gray-900">{offer.title}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" /> {offer.applications} candidature{offer.applications !== 1 ? 's' : ''}
                              </span>
                              <span>Publié le {offer.date}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                              {status.text}
                            </span>
                            
                            <div className="flex items-center gap-1">
                              {offer.status === "draft" ? (
                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full">
                                  <Play className="w-4 h-4" />
                                </button>
                              ) : null}
                              <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="px-6 py-3 border-t border-gray-200">
                  <a href="#" className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                    Voir toutes les offres
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">Dernières Candidatures Reçues</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {companyData.recentApplications.map((application) => (
                    <div key={application.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                            {application.name.split(" ")[0][0]}{application.name.split(" ")[1][0]}
                          </div>
                          <div>
                            <h3 className="text-base font-medium text-gray-900">{application.name}</h3>
                            <p className="text-sm text-gray-600">{application.position}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Match {application.matchRate}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium flex items-center gap-1">
                              <FileSearch className="w-4 h-4" />
                              Voir CV
                            </button>
                            <button className="p-1 text-green-600 hover:bg-green-50 rounded text-sm flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:bg-red-50 rounded text-sm flex items-center gap-1">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="px-6 py-3 border-t border-gray-200">
                  <a href="#" className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                    Voir toutes les candidatures
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">Actions rapides</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">Complétez votre profil d'entreprise</span>
                      <span className="text-sm text-gray-500">{companyData.profileCompletion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${companyData.profileCompletion}%` }}>
                      </div>
                    </div>
                  </div>
                  
                  {[
                    { icon: <PlusCircle className="w-5 h-5" />, text: "Publiez une nouvelle offre" },
                    { icon: <Search className="w-5 h-5" />, text: "Recherchez dans la base de candidats" },
                    { icon: <Filter className="w-5 h-5" />, text: "Activez les filtres de sélection automatique" }
                  ].map((action, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg gap-3 transition-colors"
                    >
                      <span className="text-gray-700">{action.icon}</span>
                      <span className="text-gray-800">{action.text}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Notifications */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {companyData.notifications.length} nouvelles
                  </span>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {companyData.notifications.map((notification) => (
                    <div key={notification.id} className="px-6 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3">
                      <span className="text-blue-600">
                        {notification.icon}
                      </span>
                      <span className="text-sm text-gray-700">{notification.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Resources */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">Ressources et aide</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {[
                    { icon: <GraduationCap className="w-5 h-5" />, text: "Comment attirer plus de candidats ?" },
                    { icon: <Phone className="w-5 h-5" />, text: "Contacter le support / Conseiller RH" },
                    { icon: <Handshake className="w-5 h-5" />, text: "Programme de parrainage" }
                  ].map((resource, index) => (
                    <div key={index} className="px-6 py-3 hover:bg-gray-50 transition-colors">
                      <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                        <span>{resource.icon}</span>
                        <span className="text-sm">{resource.text}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Premium Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
                    <h2 className="text-lg font-semibold">Pack Premium</h2>
                  </div>
                  
                  <p className="mb-4 text-blue-100">Débloquez toutes les fonctionnalités avancées pour optimiser vos recrutements</p>
                  
                  <div className="space-y-2 mb-4">
                    {[
                      "Boostez vos offres pour doubler leur visibilité",
                      "Tri automatique des CV par pertinence",
                      "Statistiques détaillées sur vos performances",
                      "Accès illimité à la base de candidats"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-yellow-300" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                    <Lock className="w-4 h-4" />
                    Passer au Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;