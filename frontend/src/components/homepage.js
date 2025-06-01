import React, { useState, useRef, useEffect } from 'react';
import './homepage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaperPlane, faRobot, faSearch, faGlobe, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'; // sleek arrow
import { useNavigate } from 'react-router-dom';

function Homepage(){
  const navigate = useNavigate();
  const chatboxContentRef = useRef(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [servicesoption,setServicesOption] = useState(' ');
  const [subservicesoption,setSubServicesOption] = useState(' ');
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [chatHistory, setChatHistory] = useState([]); // Track chat history

  const [userMessages, setUserMessages] = useState({
    main: '',
    services: '',
    subServices: '',
    job: ''
  });

  const [inputMessage, setInputMessage] = useState('');
  const [currentMessages, setCurrentMessages] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleChatOptionClick = (option) =>
  {
    setSelectedOption(option);
    // Add user's selection to messages
    setCurrentMessages([...currentMessages, {
      type: 'user',
      content: ` ${option.charAt(0).toUpperCase() + option.slice(1)}`,
      section: 'main'
    }]);
    
    setUserMessages(prev => ({
      ...prev,
      main: option === 'job' ? 'Job/Intern' : option.charAt(0).toUpperCase() + option.slice(1)
    }));

    if (option === "about") {
      navigate('/about');
    } else if (option === "contact") {
      navigate('/contact');
    }
  };

  const handlehomebutton=()=>
  {
    setSelectedOption(' ');
    setServicesOption(' ');
  }

  const handleServicesOption = (option) => {
    const capitalizedOption = option.charAt(0).toUpperCase() + option.slice(1);
    // Add user's service selection to messages
    setCurrentMessages([...currentMessages, {
      type: 'user',
      content: `${capitalizedOption}`,
      section: 'services'
    }]);
    
    setUserMessages(prev => ({
      ...prev,
      services: capitalizedOption,
      subServices: ''
    }));
    setServicesOption(option);
  };

  const handleSubServiceOption = (option) => {
    const capitalizedOption = option.charAt(0).toUpperCase() + option.slice(1);
    // Add user's sub-service selection to messages
    setCurrentMessages([...currentMessages, {
      type: 'user',
      content: `Selected: ${capitalizedOption}`,
      section: servicesoption
    }]);
    
    setUserMessages(prev => ({
      ...prev,
      subServices: capitalizedOption
    }));
    setSubServicesOption(option);

    // Add navigation for different sub-services
    switch(option) {
      // Data Labelling Services
      case "image annotation":
        navigate('/services/image-annotation');
        break;
      case "video annotation":
        navigate('/services/video-annotation');
        break;
      case "text annotation":
        navigate('/services/text-annotation');
        break;
      
      // AIML Services
      case "data analytics":
        navigate('/services/data-analytics');
        break;
      case "nlp":
        navigate('/services/nlp');
        break;
      case "big data analysis":
        navigate('/services/big-data-analysis');
        break;
      
      // Cloud Services
      case "paas":
        navigate('/services/paas');
        break;
      case "saas":
        navigate('/services/saas');
        break;
      case "cloud storage":
        navigate('/services/cloud-storage');
        break;
      
      // Structured Engineering Services
      case "structural substantiation":
        navigate('/services/structural-substantiation');
        break;
      case "fatigue analysis":
        navigate('/services/fatigue-analysis');
        break;
      case "damage analysis":
        navigate('/services/damage-analysis');
        break;
      
      default:
        console.warn("Unknown sub-service:", option);
    }
  };

  const handleJobOption = (option) => {
    // Add user's job selection to messages
    setCurrentMessages([...currentMessages, {
      type: 'user',
      content: `Selected: ${option === "job" ? "Job Application" : "Intern Application"}`,
      section: 'job'
    }]);
    
    setUserMessages(prev => ({
      ...prev,
      job: option === "job" ? "Job Application" : "Intern Application"
    }));

    if (option === "job") {
      navigate('/jobapplication');  // Navigate to Job Application page
    } else if (option === "intern") {
      navigate('/internapplication');  // Navigate to Intern Application page
    }
  };

  const open_fea_cfd_page = (option) => {
    // Add user's selection to messages
    setCurrentMessages([...currentMessages, {
      type: 'user',
      content: `Selected: ${option.toUpperCase()}`,
      section: 'digital_engineering'
    }]);
    
    if (option === "cad/cae automation") {
      setUserMessages(prev => ({
        ...prev,
        job: "cad/cae automation"
      }));
      navigate('/services/cadcae-automation');
    } else if (option === "fea/cfd simulation") {
      setUserMessages(prev => ({
        ...prev,
        job: "fea/cfd simulation"
      }));
      navigate('/feacfdsimulation');
    } else if (option === "cyber security") {
      navigate('/services/cyber-security');
    } else {
      console.warn("Unknown option:", option);
    }
  };

  const addUserMessage = (message) => {
    setUserMessages((prevMessages) => [...prevMessages, message]);
  };

  // Add new function for scrolling
  const scrollToBottom = () => {
    if (chatboxContentRef.current) {
      chatboxContentRef.current.scrollTop = chatboxContentRef.current.scrollHeight;
    }
  };

  // Add useEffect to scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [selectedOption, servicesoption, subservicesoption, userMessages]);

  // Add message handler
  const handleSendMessage = async () => {
  if (inputMessage.trim() !== '') {
    // Determine current active section
    let currentSection = 'main';
    if (servicesoption === "data labelling") currentSection = 'data_labelling';
    else if (servicesoption === "digital engineering") currentSection = 'digital_engineering';
    else if (servicesoption === "aiml services") currentSection = 'aiml_services';
    else if (servicesoption === "cloud services") currentSection = 'cloud_services';
    else if (servicesoption === "structured engineering") currentSection = 'structured_engineering';
    else if (selectedOption === "services") currentSection = 'services';
    else if (selectedOption === "job") currentSection = 'job';

    // Add user message
    const newMessages = [
      ...currentMessages,
      {
        type: 'user',
        content: inputMessage,
        section: currentSection
      }
    ];
    setCurrentMessages(newMessages);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputMessage }),
      });

      const data = await response.json();

      // Add AI response
      setCurrentMessages([
        ...newMessages,
        {
          type: 'bot',
          content: data.response,
          section: currentSection
        }
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setCurrentMessages([
        ...newMessages,
        {
          type: 'bot',
          content: "Sorry, something went wrong.",
          section: currentSection
        }
      ]);
    }

    setInputMessage('');
  }
};


  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleBack = () => {
    // If we're in a sub-service section (like data labelling details), go back to services menu
    if (servicesoption !== ' ') {
      // Clear all messages related to the current section and the user's selection
      setCurrentMessages(messages => 
        messages.filter(msg => {
          // Remove both the section messages and the user's selection message
          const currentSection = 
            servicesoption === "data labelling" ? "data_labelling" :
            servicesoption === "digital engineering" ? "digital_engineering" :
            servicesoption === "aiml services" ? "aiml_services" :
            servicesoption === "cloud services" ? "cloud_services" :
            servicesoption === "structured engineering" ? "structured_engineering" : "";
          
          // Keep messages that aren't from current section and aren't the selection message
          return msg.section !== currentSection && msg.section !== "services";
        })
      );

      // Go back to services menu
      setSelectedOption("services");
      setServicesOption(' ');
      setSubServicesOption(' ');
      return;
    }

    // If we're in the services menu, go back to main menu
    if (selectedOption === "services") {
      // Clear all messages including the initial service selection
      setCurrentMessages(messages => 
        messages.filter(msg => msg.section !== "services" && msg.section !== "main")
      );
      setSelectedOption('');
      setServicesOption(' ');
      setSubServicesOption(' ');
      return;
    }

    // If we're in job section
    if (selectedOption === "job") {
      // Clear all job-related messages including the selection
      setCurrentMessages(messages => 
        messages.filter(msg => msg.section !== "job" && msg.section !== "main")
      );
      setSelectedOption('');
      setServicesOption(' ');
      setSubServicesOption(' ');
      return;
    }

    // For any other case, clear everything and go to main menu
    setSelectedOption('');
    setServicesOption(' ');
    setSubServicesOption(' ');
    setCurrentMessages([]);
  };

  // Save current state to history when options change
  useEffect(() => {
    if (selectedOption || servicesoption !== ' ' || subservicesoption !== ' ') {
      setChatHistory(prev => [...prev, {
        selectedOption,
        servicesoption,
        subservicesoption,
        messages: currentMessages
      }]);
    }
  }, [selectedOption, servicesoption, subservicesoption]);

  return(
    <div className="homepage-container">
      <nav className="main-nav">
        <div className="logo-container">
          <span className="tagline1">VISTA</span>
          <span className="tagline">Innovation@work</span>
        </div>
        <div className="nav-links">
          <a href="/" className="active">HOME</a>
          <a href="/about">ABOUT US</a>
          <div className="services-dropdown">
            <a href="/services">SERVICES ▾</a>
          </div>
          <a href="/industries">INDUSTRIES</a>
          <a href="/insights">INSIGHTS</a>
          <a href="/careers">CAREERS</a>
          <a href="/csr">CSR</a>
        </div>
        <div className="nav-right">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <FontAwesomeIcon icon={faGlobe} className="globe-icon" />
          <button className="contact-btn" onClick={() => navigate('/contact')}>Contact Us</button>
        </div>
      </nav>

      <div className="hero-section" style={{
        height: '100vh',
        backgroundImage: "url('/bg2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
       
      </div>

     

      <div
        className="chatbot"
        onClick={() => setChatOpen(!chatOpen)}
        title="Chat with us"
        style={{ backgroundImage: "url('/bot_logo.png')" }}
      />

      {chatOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <div className="header-left">
              {(selectedOption !== '' || servicesoption !== ' ') && (
                <FontAwesomeIcon 
                  icon={faArrowLeft} 
                  className="back-button"
                  onClick={handleBack}
                />
              )}
              <div className="chatbox-title">VISTA Assistant</div>
            </div>
            <button className="close-button" onClick={() => setChatOpen(false)}>×</button>
          </div>
          <div className="chatbox-content" ref={chatboxContentRef}>
            <div className="bot-message-wrapper">
              <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
              <p>
                HELLO!<br /><br />
                I'm your VISTA Assistant, delighted to meet you.<br />
                Please choose an option below to get started:
              </p>
            </div>

            <div className="chat-buttons">
              <button className="chat-btn" onClick={() => handleChatOptionClick("about")}>About Us</button>
              <button className="chat-btn" onClick={() => handleChatOptionClick("services")}>Our Services </button>
              <button className="chat-btn" onClick={() => handleChatOptionClick("contact")}>Contact Info</button>
              <button className="chat-btn" onClick={() => handleChatOptionClick("job")}>Job/Intern</button>
              <button className="chat-btn" onClick={() => handleChatOptionClick("others")}>Others</button>
            </div>

            {currentMessages
              .filter(msg => msg.section === 'main')
              .map((message, index) => (
                <div key={index} className="user-message-wrapper">
                  <p className="user-message">{message.content}</p>
                </div>
              ))
            }

            {selectedOption === "services" && (
              <div className="bot-message">
                <div className="bot-message-wrapper">
                  <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                  <p>Vista Provide various services as follows</p>
                </div>
                <div className="chat-buttons">
                  <button className="chat-btn" onClick={() => handleServicesOption("data labelling")}>Data Labelling</button>
                  <button className="chat-btn" onClick={() => handleServicesOption("digital engineering")}>Digital Engineering</button>
                  <button className="chat-btn" onClick={() => handleServicesOption("aiml services")}>AIML services</button>
                  <button className="chat-btn" onClick={() => handleServicesOption("cloud services")}>Cloud services</button>
                  <button className="chat-btn" onClick={() => handleServicesOption("structured engineering")}>Structured Engineering</button>
                  <button className="chat-btn" onClick={() => handleChatOptionClick("others")}>Others</button>
                </div>
                {currentMessages
                  .filter(msg => msg.section === 'services')
                  .map((message, index) => (
                    <div key={index} className="user-message-wrapper">
                      <p className="user-message">{message.content}</p>
                    </div>
                  ))
                }
              </div>
            )}

            {selectedOption === "job" && (
              <div className="bot-message">
                <div className="bot-message-wrapper">
                  <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                  <p>Please Select any one option</p>
                </div>
                <div className="chat-buttons">
                  <button className="chat-btn" onClick={() => handleJobOption("job")}>Job Application</button>
                  <button className="chat-btn" onClick={() => handleJobOption("intern")}>Intern Application</button>
                </div>
                {currentMessages
                  .filter(msg => msg.section === 'job')
                  .map((message, index) => (
                    <div key={index} className="user-message-wrapper">
                      <p className="user-message">{message.content}</p>
                    </div>
                  ))
                }
              </div>
            )}

            {servicesoption === "data labelling" && (
              <div className="data-labelling-section">
                <div className="bot-message-wrapper">
                  <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                  <p>Vista provides precise data labelling services to enhance AI and machine learning accuracy.</p>
                </div>
                <div className="chat-buttons">
                  <button className="chat-btn" onClick={() => handleSubServiceOption("image annotation")}>Image Annotation</button>
                  <button className="chat-btn" onClick={() => handleSubServiceOption("video annotation")}>Video Annotation</button>
                  <button className="chat-btn" onClick={() => handleSubServiceOption("text annotation")}>Text Annotation</button>
                </div>
                {currentMessages
                  .filter(msg => msg.section === 'data_labelling')
                  .map((message, index) => (
                    <div key={index} className="user-message-wrapper">
                      <p className="user-message">{message.content}</p>
                    </div>
                  ))
                }
              </div>
            )}

            {servicesoption === "digital engineering" && (
              <div className="digital-engineering-section">
                <div className="bot-message-wrapper">
                  <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                  <p>
                    Vista provides digital engineering services that combine traditional engineering skills with cutting-edge digital technologies.
                  </p>
                </div>
                <div className="chat-buttons">
                  <button className="chat-btn" onClick={() => open_fea_cfd_page("cad/cae automation")}>CAD/CAE Automation</button>
                  <button className="chat-btn" onClick={() => open_fea_cfd_page("fea/cfd simulation")}>FEA/CFD Simulation</button>
                  <button className="chat-btn" onClick={() => open_fea_cfd_page("cyber security")}>Cyber Security</button>
                </div>
                {currentMessages
                  .filter(msg => msg.section === 'digital_engineering')
                  .map((message, index) => (
                    <div key={index} className="user-message-wrapper">
                      <p className="user-message">{message.content}</p>
                    </div>
                  ))
                }
              </div>
            )}

            {servicesoption === "aiml services" && (
              <div className="aiml-services-section">
                <div className="bot-message-wrapper">
                  <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                  <p>
                    Vista Projects offers AI and machine learning services that combine traditional engineering expertise with advanced digital technologies.
                  </p>
                </div>
                <div className="chat-buttons">
                  <button className="chat-btn" onClick={() => handleSubServiceOption("data analytics")}>Data Analytics</button>
                  <button className="chat-btn" onClick={() => handleSubServiceOption("nlp")}>NLP</button>
                  <button className="chat-btn" onClick={() => handleSubServiceOption("big data analysis")}>Big Data Analysis</button>
                </div>
                {currentMessages
                  .filter(msg => msg.section === 'aiml_services')
                  .map((message, index) => (
                    <div key={index} className="user-message-wrapper">
                      <p className="user-message">{message.content}</p>
                    </div>
                  ))
                }
              </div>
            )}

            {servicesoption === "cloud services" && (
              <div className="cloud-services-section">
                <div className="bot-message-wrapper">
                  <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                  <p>
                    Vista offers cloud services that enable secure, remote access to engineering data and applications.
                  </p>
                </div>
                <div className="chat-buttons">
                  <button className="chat-btn" onClick={() => handleSubServiceOption("paas")}>PaaS</button>
                  <button className="chat-btn" onClick={() => handleSubServiceOption("saas")}>SaaS</button>
                  <button className="chat-btn" onClick={() => handleSubServiceOption("cloud storage")}>Cloud Storage</button>
                </div>
                {currentMessages
                  .filter(msg => msg.section === 'cloud_services')
                  .map((message, index) => (
                    <div key={index} className="user-message-wrapper">
                      <p className="user-message">{message.content}</p>
                    </div>
                  ))
                }
              </div>
            )}

            {servicesoption === "structured engineering" && (
              <div className="structured-engineering-section">
                <div className="bot-message-wrapper">
                  <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                  <p>
                    Vista offers structural engineering services for industrial projects, focusing on safe, durable designs for structures like buildings, bridges, and platforms.
                  </p>
                </div>
                <div className="chat-buttons">
                  <button className="chat-btn" onClick={() => handleSubServiceOption("structural substantiation")}>Structural Substantiation</button>
                  <button className="chat-btn" onClick={() => handleSubServiceOption("fatigue analysis")}>Fatigue Analysis</button>
                  <button className="chat-btn" onClick={() => handleSubServiceOption("damage analysis")}>Damage Analysis</button>
                </div>
                {currentMessages
                  .filter(msg => msg.section === 'structured_engineering')
                  .map((message, index) => (
                    <div key={index} className="user-message-wrapper">
                      <p className="user-message">{message.content}</p>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
          <div className="chat-window">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.text}
              </div>
          ))}
          </div>


          <div className="chat-input-wrapper">
            <FontAwesomeIcon icon={faHome} className="chat-icon-left" onClick={handlehomebutton} />
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="chat-input-with-icons"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              name={`chat-input-${Math.random()}`}
              data-form-type="other"
              data-lpignore="true"
            />
            <FontAwesomeIcon 
              icon={faLocationArrow} 
              className="chat-icon-right"
              onClick={handleSendMessage}
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;