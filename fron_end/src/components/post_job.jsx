import { useState } from 'react';
import { 
  Check, X, ChevronDown, ChevronRight, Building, MapPin, 
  Clock, DollarSign, FileText, Target, User, Globe, 
  Briefcase, Award, MessageSquare, Eye, EyeOff, Calendar,
  Save, Send, Image, Star, AlertCircle, HelpCircle
} from 'lucide-react';
import axios from 'axios'
export default function JobPostingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    locationType: 'office',
    contractType: '',
    salary: '',
    description: '',
    responsibilities: [''],
    experience: '',
    skills: [''],
    languages: [{ language: '', level: '' }],
    education: '',
    softSkills: [''],
    filters: {
      hideNoDegree: false,
      autoSort: false,
    },
    duration: '30',
    boost: false,
    confidential: false,
    companyId : localStorage.getItem("company_id"),
    companyName : localStorage.getItem("company_name").replace(/"/g, ''),

  });
  
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  
  const totalSteps = 5;
  
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.title) newErrors.title = "Le titre du poste est requis";
      if (!formData.location) newErrors.location = "Le lieu est requis";
      if (!formData.contractType) newErrors.contractType = "Le type de contrat est requis";
    } else if (step === 2) {
      if (!formData.description || formData.description.length < 50) 
        newErrors.description = "Une description détaillée de 50 caractères minimum est requise";
      if (!formData.responsibilities[0]) 
        newErrors.responsibilities = "Au moins une responsabilité est requise";
    } else if (step === 3) {
      if (!formData.experience) newErrors.experience = "L'expérience requise est obligatoire";
      if (!formData.skills[0]) newErrors.skills = "Au moins une compétence est requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };
  
  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleFilterChange = (filterName, value) => {
    setFormData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterName]: value
      }
    }));
  };
  
  const addListItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  
  const updateListItem = (field, index, value) => {
    const newList = [...formData[field]];
    newList[index] = value;
    
    setFormData(prev => ({
      ...prev,
      [field]: newList
    }));
  };
  
  const removeListItem = (field, index) => {
    const newList = [...formData[field]];
    newList.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      [field]: newList.length ? newList : ['']
    }));
  };
  
  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, { language: '', level: '' }]
    }));
  };
  
  const updateLanguage = (index, field, value) => {
    const newLanguages = [...formData.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    
    setFormData(prev => ({
      ...prev,
      languages: newLanguages
    }));
  };
  
  const removeLanguage = (index) => {
    const newLanguages = [...formData.languages];
    newLanguages.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      languages: newLanguages.length ? newLanguages : [{ language: '', level: '' }]
    }));
  };
  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setShowPreview(true);
      console.log('Données soumises:', formData);
    try {
      const response = await axios.post("http://localhost:8000/company_offers/add-job-offer-company/",formData);
      console.log(response.status)
      if (response.status === 200) {
        console.log("good")
      }
  
    } catch (err) {
      console.error("Erreur de connexion:", err);
    } 
    }
  };
  
  const handleSaveDraft = () => {
    // Dans un vrai projet, ici on sauvegarderait le brouillon
    console.log('Brouillon sauvegardé:', formData);
    
    // Afficher un message temporaire
    alert('Brouillon sauvegardé avec succès!');
  };

  // Fonction pour formater la date actuelle + 30 jours
  const formatFutureDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(days));
    return date.toLocaleDateString('fr-FR');
  };
  
  // Rendu conditionnel pour chaque étape du formulaire
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Informations Générales</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <div className="flex">
                <div className="mr-3 mt-1">
                  <HelpCircle className="text-blue-500" size={20} />
                </div>
                <div>
                  <p className="text-blue-800 text-sm">Un bon titre d'offre d'emploi est concis et contient les mots-clés que les candidats recherchent. Il doit indiquer clairement le poste et l'expertise recherchés.</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Titre du poste <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Ex: Développeur Full Stack React/Node.js"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg ${
                  errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Lieu <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <select
                    value={formData.locationType}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, locationType: e.target.value }));
                    }}
                    className="p-3 border border-gray-300 rounded-l-lg bg-gray-50 w-1/3"
                  >
                    <option value="office">Bureau</option>
                    <option value="remote">Télétravail</option>
                    <option value="hybrid">Hybride</option>
                  </select>
                  <input
                    type="text"
                    name="location"
                    placeholder={formData.locationType === 'remote' ? 'Partout' : 'Ville, Pays'}
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-2/3 p-3 border rounded-r-lg ${
                      errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Type de contrat <span className="text-red-500">*</span>
                </label>
                <select
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${
                    errors.contractType ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="" disabled>Sélectionner un type de contrat</option>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Stage">Stage</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Alternance">Alternance</option>
                </select>
                {errors.contractType && (
                  <p className="text-red-500 text-sm mt-1">{errors.contractType}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Salaire (optionnel)
              </label>
              <input
                type="text"
                name="salary"
                placeholder="Ex: 40k–50k €/an ou À négocier"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <p className="text-gray-500 text-xs mt-1">
                Les offres avec salaires reçoivent 40% plus de candidatures
              </p>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Description du Poste</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <div className="flex">
                <div className="mr-3 mt-1">
                  <HelpCircle className="text-blue-500" size={20} />
                </div>
                <div>
                  <p className="text-blue-800 text-sm">Une description détaillée permet aux candidats de mieux comprendre le poste. Incluez le contexte, les missions principales et ce qui rend ce poste unique.</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Description complète <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez les missions principales, les objectifs du poste, les conditions de travail..."
                rows="6"
                className={`w-full p-3 border rounded-lg ${
                  errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              ></textarea>
              <div className="flex justify-between text-xs mt-1">
                <p className={errors.description ? "text-red-500" : "text-gray-500"}>
                  Minimum 50 caractères
                </p>
                <p className="text-gray-500">
                  {formData.description.length} caractères
                </p>
              </div>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Responsabilités principales <span className="text-red-500">*</span>
              </label>
              {formData.responsibilities.map((responsibility, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) => updateListItem('responsibilities', index, e.target.value)}
                    placeholder="Ex: Développer de nouvelles fonctionnalités"
                    className={`w-full p-3 border rounded-lg ${
                      errors.responsibilities && index === 0 ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('responsibilities', index)}
                    disabled={formData.responsibilities.length === 1}
                    className="ml-2 p-3 text-gray-500 hover:text-red-500 disabled:opacity-30"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              {errors.responsibilities && (
                <p className="text-red-500 text-sm mb-2">{errors.responsibilities}</p>
              )}
              <button
                type="button"
                onClick={() => addListItem('responsibilities')}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <span className="mr-1">+</span> Ajouter une responsabilité
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Profil Recherché</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <div className="flex">
                <div className="mr-3 mt-1">
                  <HelpCircle className="text-blue-500" size={20} />
                </div>
                <div>
                  <p className="text-blue-800 text-sm">Soyez précis sur les compétences et qualifications requises, mais évitez d'être trop restrictif pour ne pas décourager des candidats prometteurs.</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Années d'expérience <span className="text-red-500">*</span>
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg ${
                  errors.experience ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="" disabled>Sélectionner l'expérience requise</option>
                <option value="0-1">0-1 an (Junior)</option>
                <option value="2-3">2-3 ans (Intermédiaire)</option>
                <option value="4-5">4-5 ans (Confirmé)</option>
                <option value="5+">5+ ans (Senior)</option>
              </select>
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Compétences requises <span className="text-red-500">*</span>
              </label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateListItem('skills', index, e.target.value)}
                    placeholder="Ex: React, Node.js, Git, SQL"
                    className={`w-full p-3 border rounded-lg ${
                      errors.skills && index === 0 ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('skills', index)}
                    disabled={formData.skills.length === 1}
                    className="ml-2 p-3 text-gray-500 hover:text-red-500 disabled:opacity-30"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              {errors.skills && (
                <p className="text-red-500 text-sm mb-2">{errors.skills}</p>
              )}
              <button
                type="button"
                onClick={() => addListItem('skills')}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <span className="mr-1">+</span> Ajouter une compétence
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Langues (optionnel)
              </label>
              {formData.languages.map((lang, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                    placeholder="Ex: Anglais"
                    className="w-1/2 p-3 border border-gray-300 rounded-l-lg"
                  />
                  <select
                    value={lang.level}
                    onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                    className="w-1/2 p-3 border-y border-r border-gray-300 rounded-r-lg"
                  >
                    <option value="">Niveau</option>
                    <option value="A1">A1 (Débutant)</option>
                    <option value="A2">A2 (Élémentaire)</option>
                    <option value="B1">B1 (Intermédiaire)</option>
                    <option value="B2">B2 (Intermédiaire avancé)</option>
                    <option value="C1">C1 (Avancé)</option>
                    <option value="C2">C2 (Maîtrise)</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    disabled={formData.languages.length === 1}
                    className="ml-2 p-3 text-gray-500 hover:text-red-500 disabled:opacity-30"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLanguage}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <span className="mr-1">+</span> Ajouter une langue
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Diplôme requis (optionnel)
              </label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Non requis</option>
                <option value="Bac">Bac</option>
                <option value="Bac+2">Bac+2</option>
                <option value="Bac+3">Bac+3 (Licence)</option>
                <option value="Bac+5">Bac+5 (Master, Ingénieur)</option>
                <option value="Bac+8">Bac+8 (Doctorat)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Soft skills souhaités
              </label>
              {formData.softSkills.map((skill, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateListItem('softSkills', index, e.target.value)}
                    placeholder="Ex: Autonomie, Communication, Proactivité"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('softSkills', index)}
                    disabled={formData.softSkills.length === 1}
                    className="ml-2 p-3 text-gray-500 hover:text-red-500 disabled:opacity-30"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem('softSkills')}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <span className="mr-1">+</span> Ajouter un soft skill
              </button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Paramètres de Recrutement (Avancé)</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Filtres de pré-sélection automatiques</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hideNoDegree"
                    checked={formData.filters.hideNoDegree}
                    onChange={(e) => handleFilterChange('hideNoDegree', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="hideNoDegree" className="ml-2 text-sm">
                    Ne pas afficher les candidatures sans diplôme requis
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoSort"
                    checked={formData.filters.autoSort}
                    onChange={(e) => handleFilterChange('autoSort', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="autoSort" className="ml-2 text-sm">
                    Trier par compatibilité automatique (matching)
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                  Tests ou questionnaires
                </label>
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <p className="text-sm text-gray-500 mb-4">
                    Associez un test technique ou un quiz à cette offre pour évaluer les compétences des candidats.
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    Associer un test
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex">
                <div className="mr-3 mt-1">
                  <AlertCircle className="text-yellow-500" size={20} />
                </div>
                <div>
                  <p className="text-yellow-800 text-sm">
                    <strong>Astuce Pro :</strong> Les tests techniques en début de processus peuvent réduire de 50% le temps de recrutement en permettant d'identifier rapidement les candidats qualifiés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Visibilité et Publication</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <div className="flex">
                <div className="mr-3 mt-1">
                  <HelpCircle className="text-blue-500" size={20} />
                </div>
                <div>
                  <p className="text-blue-800 text-sm">Les 72 premières heures après la publication sont cruciales. 60% des candidatures sont reçues pendant cette période.</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Durée de publication
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="15">15 jours (jusqu'au {formatFutureDate(15)})</option>
                <option value="30">30 jours (jusqu'au {formatFutureDate(30)})</option>
                <option value="60">60 jours (jusqu'au {formatFutureDate(60)})</option>
                <option value="0">Illimitée</option>
              </select>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    id="boost"
                    checked={formData.boost}
                    onChange={(e) => setFormData({...formData, boost: e.target.checked})}
                    className="w-5 h-5 mt-1 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-800">Boost de visibilité (premium)</h3>
                    <p className="text-sm text-gray-600">
                      Mettez en avant votre annonce sur la page d'accueil et dans les newsletters.
                      <span className="block text-blue-600 font-medium mt-1">+ 180% de visibilité</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Confidentialité
              </label>
              <div className="flex items-center p-4 bg-white border border-gray-300 rounded-lg">
                <input
                  type="checkbox"
                  id="confidential"
                  checked={formData.confidential}
                  onChange={(e) => setFormData({...formData, confidential: e.target.checked})}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="confidential" className="ml-2 flex flex-col">
                  <span className="font-medium text-gray-800">Masquer le nom de l'entreprise</span>
                  <span className="text-sm text-gray-500">Les candidats ne verront pas le nom de votre entreprise</span>
                </label>
              </div>
            </div>
            
            {showPreview && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Aperçu de l'offre</h3>
                    <button 
                      onClick={() => setShowPreview(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{formData.title || "Titre du poste"}</h2>
                        <div className="flex items-center text-gray-600 mt-1">
                          <MapPin size={16} className="mr-1" />
                          <span>{formData.locationType === 'remote' ? 'Télétravail' : ''} {formData.location}</span>
                          <span className="mx-2">•</span>
                          <Clock size={16} className="mr-1" />
                          <span>{formData.contractType}</span>
                          {formData.salary && (
                            <>
                              <span className="mx-2">•</span>
                              <DollarSign size={16} className="mr-1" />
                              <span>{formData.salary}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Nouveau • Publié aujourd'hui
                      </div>
                    </div>
                    
                    <hr className="my-4" />
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-700 whitespace-pre-line">{formData.description || "Aucune description fournie."}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Responsabilités</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {formData.responsibilities.map((resp, i) => (
                          resp ? <li key={i}>{resp}</li> : null
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Profil recherché</h3>
                      <div className="flex flex-wrap mb-3">
                        {formData.experience && (
                          <span className="bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                            {formData.experience} ans d'expérience
                          </span>
                        )}
                        {formData.education && (
                          <span className="bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                            {formData.education}
                          </span>
                        )}
                        {formData.languages.map((lang, i) => (
                          lang.language && lang.level ? (
                            <span key={i} className="bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                              {lang.language} ({lang.level})
                            </span>
                          ) : null
                        ))}
                      </div>
                      
                      <h4 className="font-medium mb-2">Compétences requises:</h4>
                      <div className="flex flex-wrap mb-3">
                        {formData.skills.map((skill, i) => (
                          skill ? (
                            <span key={i} className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                              {skill}
                            </span>
                          ) : null
                        ))}
                      </div>
                      
                      {formData.softSkills[0] && (
                        <>
                          <h4 className="font-medium mb-2">Soft skills:</h4>
                          <div className="flex flex-wrap">
                            {formData.softSkills.map((skill, i) => (
                              skill ? (
                                <span key={i} className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                                  {skill}
                                </span>
                              ) : null
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {formData.companyDescription && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">À propos de l'entreprise</h3>
                        <p className="text-gray-700">{formData.companyDescription}</p>
                        {formData.companyValues && (
                          <div className="mt-3">
                            <h4 className="font-medium mb-1">Nos valeurs:</h4>
                            <p className="text-gray-700">{formData.companyValues}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowPreview(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Retour à l'édition
                    </button>
                    <button
                      onClick={() => alert("Offre publiée avec succès!")}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Confirmer et publier
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Publier une offre d'emploi</h1>
          <div className="text-gray-500 text-sm font-medium">Étape {currentStep}/{totalSteps}</div>
        </div>
        
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex flex-wrap justify-between mt-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`text-xs font-medium ${
                step <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {step === 1 && "Informations"}
              {step === 2 && "Description"}
              {step === 3 && "Profil"}
              {step === 4 && "Paramètres"}
              {step === 5 && "Publication"}
            </button>
          ))}
        </div>
      </div>
      
      {/* Form steps */}
      <form>
        {renderStepContent()}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-6 py-2.5 border border-gray-300 rounded-lg ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Précédent
          </button>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-6 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <Save size={18} className="mr-2" />
              Sauvegarder
            </button>
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Suivant
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Send size={18} className="mr-2" />
                Publier l'offre
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}