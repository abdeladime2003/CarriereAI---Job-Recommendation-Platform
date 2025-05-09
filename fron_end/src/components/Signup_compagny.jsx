import React, { useState } from "react";
import { Building2, MapPin, Mail, Phone, Briefcase, Users, Globe, Shield, Sparkles } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EnterpriseSignup = () => {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [employeesCount, setEmployeesCount] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const [error, setError] = useState("");
  
  const industries = [
    "Technologie et IT",
    "Finance et Assurance",
    "Santé et Pharmaceutique",
    "Marketing et Communication",
    "Commerce et Distribution",
    "Industrie et Manufacturing",
    "Conseil et Services",
    "Éducation et Formation",
    "Transport et Logistique",
    "Autre"
  ];

  const employeeRanges = [
    "1-10 employés",
    "11-50 employés",
    "51-200 employés",
    "201-500 employés",
    "501-1000 employés",
    "1000+ employés"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/Compagny/Signup/", {
        company_name: companyName,
        industry,
        email,
        phone,
        website,
        address,
        postal_code: postalCode,
        city,
        employees_count: employeesCount,
        contact_person: contactPerson,
        password,
        confirm_password: confirmPassword
      });
      console.log(response.data);
      console.log("Entreprise créée avec succès");
      await delay(2000);
      navigate("/Compagny/signin");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Une erreur s'est produite");
    }
  };

  const formFields = [
    { 
      label: "Nom de l'entreprise", 
      name: "companyName", 
      value: companyName, 
      type: "text", 
      placeholder: "Votre entreprise",
      icon: <Building2 className="w-5 h-5" />,
      onChange: (e) => setCompanyName(e.target.value),
      colSpan: true
    },
    { 
      label: "Secteur d'activité", 
      name: "industry", 
      value: industry, 
      type: "select", 
      options: industries,
      placeholder: "Sélectionnez un secteur",
      icon: <Briefcase className="w-5 h-5" />,
      onChange: (e) => setIndustry(e.target.value)
    },
    { 
      label: "Taille de l'entreprise", 
      name: "employeesCount", 
      value: employeesCount, 
      type: "select", 
      options: employeeRanges,
      placeholder: "Nombre d'employés",
      icon: <Users className="w-5 h-5" />,
      onChange: (e) => setEmployeesCount(e.target.value)
    },
    { 
      label: "Email professionnel", 
      name: "email", 
      value: email, 
      type: "email", 
      placeholder: "contact@entreprise.fr",
      icon: <Mail className="w-5 h-5" />,
      onChange: (e) => setEmail(e.target.value)
    },
    { 
      label: "Téléphone", 
      name: "phone", 
      value: phone, 
      type: "tel", 
      placeholder: "Numéro de téléphone",
      icon: <Phone className="w-5 h-5" />,
      onChange: (e) => setPhone(e.target.value)
    },
    { 
      label: "Site web", 
      name: "website", 
      value: website, 
      type: "url", 
      placeholder: "www.votreentreprise.fr",
      icon: <Globe className="w-5 h-5" />,
      onChange: (e) => setWebsite(e.target.value)
    },
    { 
      label: "Adresse", 
      name: "address", 
      value: address, 
      type: "text", 
      placeholder: "Adresse de l'entreprise",
      icon: <MapPin className="w-5 h-5" />,
      onChange: (e) => setAddress(e.target.value),
      colSpan: true
    },
    { 
      label: "Code postal", 
      name: "postalCode", 
      value: postalCode, 
      type: "text", 
      placeholder: "Code postal",
      icon: <MapPin className="w-5 h-5" />,
      onChange: (e) => setPostalCode(e.target.value)
    },
    { 
      label: "Ville", 
      name: "city", 
      value: city, 
      type: "text", 
      placeholder: "Ville",
      icon: <MapPin className="w-5 h-5" />,
      onChange: (e) => setCity(e.target.value)
    },
    { 
      label: "Personne à contacter", 
      name: "contactPerson", 
      value: contactPerson, 
      type: "text", 
      placeholder: "Nom et prénom",
      icon: <Users className="w-5 h-5" />,
      onChange: (e) => setContactPerson(e.target.value),
      colSpan: true
    },
    { 
      label: "Mot de passe", 
      name: "password", 
      value: password, 
      type: "password", 
      placeholder: "••••••••",
      icon: <Shield className="w-5 h-5" />,
      onChange: (e) => setPassword(e.target.value)
    },
    { 
      label: "Confirmer le mot de passe", 
      name: "confirmPassword", 
      value: confirmPassword, 
      type: "password", 
      placeholder: "••••••••",
      icon: <Shield className="w-5 h-5" />,
      onChange: (e) => setConfirmPassword(e.target.value)
    }
  ];

  return (
    <div className="min-h-screen relative font-[sans-serif] bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 p-6">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -left-48 -top-48 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -right-48 -bottom-48 bg-pink-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute w-64 h-64 left-1/4 top-1/4 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute w-64 h-64 right-1/4 bottom-1/4 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.12)] overflow-hidden border border-white/20">
        {/* Left section - Enterprise benefits */}
        <div className="relative overflow-hidden p-8 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] animate-pulse"></div>
          
          {/* Floating sparkles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  transform: `scale(${0.5 + Math.random() * 0.5})`
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-200" />
              </div>
            ))}
          </div>

          <div className="relative max-w-md space-y-12 mx-auto">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-indigo-200" />
                <h4 className="text-white text-xl font-semibold">Développez Votre Entreprise</h4>
              </div>
              <p className="text-indigo-100 mt-3">
                Accédez à un vivier de talents qualifiés et motivés pour renforcer vos équipes.
              </p>
            </div>

            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-indigo-200" />
                <h4 className="text-white text-xl font-semibold">Recrutement Optimisé</h4>
              </div>
              <p className="text-indigo-100 mt-3">
                Notre algorithme de matching vous présente uniquement les candidats qui correspondent à vos besoins.
              </p>
            </div>

            {/* Enhanced animated card */}
            <div className="relative p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all duration-300 hover:shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-xl group-hover:opacity-75 transition-opacity"></div>
              <h4 className="text-white text-xl font-semibold mb-3">✨ Avantages Exclusifs</h4>
              <ul className="space-y-2 text-indigo-100">
                <li className="flex items-center gap-2 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover/item:scale-150 transition-transform"></div>
                  Accès prioritaire aux meilleurs profils
                </li>
                <li className="flex items-center gap-2 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover/item:scale-150 transition-transform"></div>
                  Dashboard de suivi des candidatures
                </li>
                <li className="flex items-center gap-2 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover/item:scale-150 transition-transform"></div>
                  Accompagnement personnalisé
                </li>
                <li className="flex items-center gap-2 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover/item:scale-150 transition-transform"></div>
                  Visibilité accrue auprès des étudiants
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced form section */}
        <form onSubmit={handleSubmit} className="p-8 w-full overflow-y-auto max-h-screen">
          <div className="mb-8 relative group">
            <h3 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Espace Entreprise
            </h3>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <div className="grid gap-6">
            {formFields.map((field, index) => (
              <div key={index} className={`group relative ${field.colSpan ? 'col-span-full' : ''}`}>
                <label className="text-gray-700 text-sm mb-2 block font-medium flex items-center gap-2">
                  {field.icon}
                  {field.label}
                </label>
                <div className="relative">
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-lg bg-purple-50/50 border border-purple-100 
                               text-gray-800 text-sm transition-all duration-300
                               focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                               group-hover:shadow-lg group-hover:border-purple-300"
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={field.name}
                      type={field.type}
                      value={field.value}
                      onChange={field.onChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-lg bg-purple-50/50 border border-purple-100 
                               text-gray-800 text-sm transition-all duration-300
                               focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                               group-hover:shadow-lg group-hover:border-purple-300"
                      placeholder={field.placeholder}
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/0 to-pink-400/0 
                                rounded-lg opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none
                                ${focusedField === field.name ? 'animate-pulse' : ''}`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center mt-8">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-purple-300 text-indigo-600 focus:ring-indigo-500 transition-colors duration-200"
              required
            />
            <label htmlFor="terms" className="ml-3 block text-sm text-gray-700">
              J'accepte les{" "}
              <a href="#" className="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors duration-200">
                conditions générales d'utilisation
              </a>
            </label>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-4 px-6 text-white font-medium rounded-lg
                       bg-gradient-to-r from-indigo-500 to-purple-500 
                       hover:from-indigo-600 hover:to-purple-600
                       transform hover:scale-[1.02] transition-all duration-300
                       shadow-lg hover:shadow-xl
                       focus:ring-2 focus:ring-indigo-300 focus:outline-none
                       relative overflow-hidden group"
            >
              <span className="relative z-10">✨ Créer mon espace entreprise</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Déjà inscrit ?{" "}
            <a href="/Compagny/signin" className="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors duration-200">
              Connectez-vous
            </a>
          </div>
        </form>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(10px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default EnterpriseSignup;