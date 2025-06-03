import React, { useState, useRef, useEffect } from 'react';
import './homepage.css';
import TypingAnimation from './TypingAnimation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaperPlane, faRobot, faSearch, faGlobe, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'; // sleek arrow
import { useNavigate } from 'react-router-dom';

// Add this formatting function at the top of the file
const formatBotResponse = (content) => {
  // Split content into sentences and filter out empty ones
  const sentences = content.split(/[.!?]/).filter(sentence => sentence.trim().length > 0);
  
  if (sentences.length > 1) {
    return (
      <div className="formatted-bot-message">
        {sentences.map((sentence, index) => (
          <div key={index} className="bot-message-point">
            • {sentence.trim()}
          </div>
        ))}
      </div>
    );
  }
  return <p>{content}</p>;
};

function Homepage(){
  const navigate = useNavigate();
  const chatboxContentRef = useRef(null);

  // Initialize state from localStorage if available
  const [chatOpen, setChatOpen] = useState(() => {
    const saved = localStorage.getItem('chatOpen');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [selectedOption, setSelectedOption] = useState(() => {
    const saved = localStorage.getItem('selectedOption');
    return saved ? JSON.parse(saved) : '';
  });
  
  const [servicesoption, setServicesOption] = useState(() => {
    const saved = localStorage.getItem('servicesoption');
    return saved ? JSON.parse(saved) : ' ';
  });
  
  const [subservicesoption, setSubServicesOption] = useState(() => {
    const saved = localStorage.getItem('subservicesoption');
    return saved ? JSON.parse(saved) : ' ';
  });
  
  const [currentMessages, setCurrentMessages] = useState(() => {
    const saved = localStorage.getItem('currentMessages');
    return saved ? JSON.parse(saved) : [];
  });

  const [navigationHistory, setNavigationHistory] = useState([]);
  const [chatHistory, setChatHistory] = useState([]); // Track chat history

  const [userMessages, setUserMessages] = useState({
    main: '',
    services: '',
    subServices: '',
    job: ''
  });

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [serviceTyping, setServiceTyping] = useState(false);
  const [subServiceTyping, setSubServiceTyping] = useState(false);  // Add new state for subservice typing

  const handleChatOptionClick = async (option) => {
    setSelectedOption(option);
    
    if (option === "job") {
      setServicesOption(' ');
      setSubServicesOption(' ');
    } else {
      setCurrentMessages([...currentMessages, {
        type: 'user',
        content: option === 'about' ? 'About Us' :
                 option === 'contact' ? 'Contact Info' :
                 option === 'services' ? 'Our Services' : option,
        section: 'main'
      }]);
    }

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
    setServicesOption(option);
  };

  const handleSubServiceOption = (option) => {
    const capitalizedOption = option.charAt(0).toUpperCase() + option.slice(1);
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
    // Directly navigate to the appropriate form without adding messages
    if (option === "job") {
      navigate('/jobapplication');
    } else if (option === "intern") {
      navigate('/internapplication');
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

  // Modify handleSendMessage to include typing animation
  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      // Add user message immediately
      const newUserMessage = {
        type: 'user',
        content: inputMessage,
        section: 'chat'
      };
      setCurrentMessages(prevMessages => [...prevMessages, newUserMessage]);
      setInputMessage(''); // Clear input field

      // Show typing animation
      setIsTyping(true);

      try {
        const response = await fetch('http://localhost:5001/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            query: inputMessage,
            context: {
              selectedOption,
              servicesoption,
              subservicesoption
            }
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Add a small delay to make the typing animation visible
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Add bot response
        setCurrentMessages(prevMessages => [...prevMessages, {
          type: 'bot',
          content: data.response || "I'm sorry, I couldn't process that request.",
          section: 'chat'
        }]);
      } catch (error) {
        console.error("Error fetching response:", error);
        // Add error message as bot response
        setCurrentMessages(prevMessages => [...prevMessages, {
          type: 'bot',
          content: "I apologize, but I'm having trouble connecting to the server. Please try again later.",
          section: 'chat'
        }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  // Make sure we have the keyPress handler
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Add useEffect to scroll to bottom when messages change
  useEffect(() => {
    if (chatboxContentRef.current) {
      chatboxContentRef.current.scrollTop = chatboxContentRef.current.scrollHeight;
    }
  }, [currentMessages]);

  // Add this section to display messages in the chatbox content
  const renderMessages = () => {
    return currentMessages.map((message, index) => (
      <div key={index} className={message.type === 'user' ? 'user-message-wrapper' : 'bot-message-wrapper'}>
        {message.type === 'bot' && <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />}
        <div className={message.type === 'user' ? 'user-message' : ''}>
          {message.content}
        </div>
      </div>
    ));
  };

  const handleBack = () => {
    // If there are chat messages, remove only the most recent message pair
    if (currentMessages.some(msg => msg.section === 'chat')) {
      setCurrentMessages(prevMessages => {
        // Find the last chat message pair and remove them
        const lastUserMessageIndex = [...prevMessages].reverse().findIndex(msg => msg.section === 'chat' && msg.type === 'user');
        if (lastUserMessageIndex !== -1) {
          // Remove the last user message and its corresponding bot response
          return prevMessages.slice(0, prevMessages.length - 2);
        }
        return prevMessages;
      });
      return;
    }

    // Handle service navigation
    if (servicesoption !== ' ') {
      setSelectedOption("services");
      setServicesOption(' ');
      setSubServicesOption(' ');
      // Clear the messages related to service selection
      setCurrentMessages(prevMessages => 
        prevMessages.filter(msg => msg.content !== servicesoption)
      );
      return;
    }

    if (selectedOption === "services") {
      setSelectedOption('');
      setServicesOption(' ');
      setSubServicesOption(' ');
      // Clear all service-related messages
      setCurrentMessages(prevMessages => 
        prevMessages.filter(msg => msg.content !== 'Our Services')
      );
      return;
    }

    if (selectedOption === "job") {
      setSelectedOption('');
      setServicesOption(' ');
      setSubServicesOption(' ');
      // Clear job-related messages
      setCurrentMessages(prevMessages => 
        prevMessages.filter(msg => msg.content !== 'Job/Intern')
      );
      return;
    }

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

  // Add useEffect hooks to save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('chatOpen', JSON.stringify(chatOpen));
  }, [chatOpen]);

  useEffect(() => {
    localStorage.setItem('selectedOption', JSON.stringify(selectedOption));
  }, [selectedOption]);

  useEffect(() => {
    localStorage.setItem('servicesoption', JSON.stringify(servicesoption));
  }, [servicesoption]);

  useEffect(() => {
    localStorage.setItem('subservicesoption', JSON.stringify(subservicesoption));
  }, [subservicesoption]);

  useEffect(() => {
    localStorage.setItem('currentMessages', JSON.stringify(currentMessages));
  }, [currentMessages]);

  const resetChatStates = () => {
    setSelectedOption('');
    setServicesOption(' ');
    setSubServicesOption(' ');
    setCurrentMessages([]);
    setMessages([]);
    setInputMessage('');
    setUserMessages({
      main: '',
      services: '',
      subServices: '',
      job: ''
    });
    // Clear localStorage
    localStorage.removeItem('selectedOption');
    localStorage.removeItem('servicesoption');
    localStorage.removeItem('subservicesoption');
    localStorage.removeItem('currentMessages');
    localStorage.removeItem('chatOpen');
  };

  const handleChatClose = () => {
    setChatOpen(false);
    resetChatStates();
  };

  const handleChatOpen = () => {
    setChatOpen(true);
    // The welcome message will show automatically since we're resetting all states
  };

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
        onClick={handleChatOpen}
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
            <button className="close-button" onClick={handleChatClose}>×</button>
          </div>
          <div className="chatbox-content" ref={chatboxContentRef}>
            {/* Always show welcome message and main menu */}
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
              <button className="chat-btn" onClick={() => handleChatOptionClick("services")}>Our Services</button>
              <button className="chat-btn" onClick={() => handleChatOptionClick("contact")}>Contact Info</button>
              <button className="chat-btn" onClick={() => handleChatOptionClick("job")}>Job/Intern</button>
            </div>

            {/* Conditional content based on selection */}
            {selectedOption === "job" && (
              <div className="job-section">
                <div className="bot-message-wrapper">
                  <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                  <p>Please Select any one option</p>
                </div>
                <div className="chat-buttons">
                  <button className="chat-btn" onClick={() => handleJobOption("job")}>Job Application</button>
                  <button className="chat-btn" onClick={() => handleJobOption("intern")}>Intern Application</button>
                </div>
              </div>
            )}

            {selectedOption === "services" && (
              <div className="bot-message">
                {/* Display "Our Services" user selection */}
                <div className="user-message-wrapper">
                  <div className="user-message">
                    Our Services
                  </div>
                </div>

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
                </div>

                {/* Display service selection and content */}
                {servicesoption && servicesoption !== ' ' && (
                  <>
                    <div className="user-message-wrapper">
                      <div className="user-message">
                        {servicesoption.charAt(0).toUpperCase() + servicesoption.slice(1)}
                      </div>
                    </div>

                    {/* Data Labelling Section */}
                    {servicesoption === "data labelling" && (
                      <div className="service-content">
                        <div className="bot-message-wrapper">
                          <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                          <p>Vista provides precise data labelling services to enhance AI and machine learning accuracy.</p>
                        </div>
                        <div className="chat-buttons">
                          <button className="chat-btn" onClick={() => handleSubServiceOption("image annotation")}>Image Annotation</button>
                          <button className="chat-btn" onClick={() => handleSubServiceOption("video annotation")}>Video Annotation</button>
                          <button className="chat-btn" onClick={() => handleSubServiceOption("text annotation")}>Text Annotation</button>
                        </div>

                        {/* Show subservice selection */}
                        {subservicesoption && subservicesoption !== ' ' && (
                          <>
                            <div className="user-message-wrapper">
                              <div className="user-message">
                                {subservicesoption.charAt(0).toUpperCase() + subservicesoption.slice(1)}
                              </div>
                            </div>

                            {/* Show subservice content */}
                            <div className="bot-message-wrapper">
                              <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                              <p>
                                {subservicesoption === "image annotation" && "Our image annotation service provides precise labeling for computer vision applications."}
                                {subservicesoption === "video annotation" && "We offer frame-by-frame video annotation for dynamic object tracking and scene understanding."}
                                {subservicesoption === "text annotation" && "Our text annotation service helps train NLP models with high-quality labeled data."}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Digital Engineering Section */}
                    {servicesoption === "digital engineering" && (
                      <div className="service-content">
                        <div className="bot-message-wrapper">
                          <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                          <p>Vista provides digital engineering services that combine traditional engineering skills with cutting-edge digital technologies.</p>
                        </div>
                        <div className="chat-buttons">
                          <button className="chat-btn" onClick={() => open_fea_cfd_page("cad/cae automation")}>CAD/CAE Automation</button>
                          <button className="chat-btn" onClick={() => open_fea_cfd_page("fea/cfd simulation")}>FEA/CFD Simulation</button>
                          <button className="chat-btn" onClick={() => open_fea_cfd_page("cyber security")}>Cyber Security</button>
                        </div>
                      </div>
                    )}

                    {/* AIML Services */}
                    {servicesoption === "aiml services" && (
                      <div className="service-content">
                        <div className="bot-message-wrapper">
                          <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                          <p>Vista Projects offers AI and machine learning services that combine traditional engineering expertise with advanced digital technologies.</p>
                        </div>
                        <div className="chat-buttons">
                          <button className="chat-btn" onClick={() => handleSubServiceOption("data analytics")}>Data Analytics</button>
                          <button className="chat-btn" onClick={() => handleSubServiceOption("nlp")}>NLP</button>
                          <button className="chat-btn" onClick={() => handleSubServiceOption("big data analysis")}>Big Data Analysis</button>
                        </div>

                        {/* Show subservice selection */}
                        {subservicesoption && subservicesoption !== ' ' && (
                          <>
                            <div className="user-message-wrapper">
                              <div className="user-message">
                                {subservicesoption.charAt(0).toUpperCase() + subservicesoption.slice(1)}
                              </div>
                            </div>

                            <div className="bot-message-wrapper">
                              <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                              <p>
                                {subservicesoption === "data analytics" && "Our data analytics services help organizations extract valuable insights from their data."}
                                {subservicesoption === "nlp" && "We provide Natural Language Processing solutions for text analysis and understanding."}
                                {subservicesoption === "big data analysis" && "Our big data analysis services help handle and analyze large-scale datasets efficiently."}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Cloud Services */}
                    {servicesoption === "cloud services" && (
                      <div className="service-content">
                        <div className="bot-message-wrapper">
                          <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                          <p>Vista offers cloud services that enable secure, remote access to engineering data and applications.</p>
                        </div>
                        <div className="chat-buttons">
                          <button className="chat-btn" onClick={() => handleSubServiceOption("paas")}>PaaS</button>
                          <button className="chat-btn" onClick={() => handleSubServiceOption("saas")}>SaaS</button>
                          <button className="chat-btn" onClick={() => handleSubServiceOption("cloud storage")}>Cloud Storage</button>
                        </div>
                      </div>
                    )}

                    {/* Structured Engineering */}
                    {servicesoption === "structured engineering" && (
                      <div className="service-content">
                        <div className="bot-message-wrapper">
                          <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                          <p>Vista offers structural engineering services for industrial projects, focusing on safe, durable designs for structures like buildings, bridges, and platforms.</p>
                        </div>
                        <div className="chat-buttons">
                          <button className="chat-btn" onClick={() => handleSubServiceOption("structural substantiation")}>Structural Substantiation</button>
                          <button className="chat-btn" onClick={() => handleSubServiceOption("fatigue analysis")}>Fatigue Analysis</button>
                          <button className="chat-btn" onClick={() => handleSubServiceOption("damage analysis")}>Damage Analysis</button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Add this section to display chat messages */}
            {currentMessages
              .filter(msg => msg.section === 'chat')
              .map((message, index) => (
                <div key={index} className={message.type === 'user' ? 'user-message-wrapper' : 'bot-message-wrapper'}>
                  {message.type === 'bot' && <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />}
                  <div className={message.type === 'user' ? 'user-message' : 'bot-response'}>
                    {message.type === 'bot' ? formatBotResponse(message.content) : message.content}
                  </div>
                </div>
              ))
            }

            {isTyping && (
              <div className="bot-message-wrapper">
                <img src="/bot_logo2.png" alt="bot" className="bot-avatar" />
                <TypingAnimation />
              </div>
            )}

            {/* Add this section to display user input messages */}
            {currentMessages.length > 0 && !selectedOption && (
              <div className="messages-container">
                {renderMessages()}
              </div>
            )}
          </div>
          <div className="chat-input-wrapper">
            <FontAwesomeIcon icon={faHome} className="chat-icon-left" onClick={handlehomebutton} />
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="chat-input-with-icons"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
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