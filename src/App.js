import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Team from "./scenes/team";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import SignupPage from "./scenes/signup";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Engineers from "./scenes/engineers";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Customerprofile from "./scenes/customerDashboard/customerDashboard";
import Customerbar from "./scenes/global/Customerbar";
import Customerform from "./scenes/customerDashboard/customerform";
import Customerboard from "./scenes/customerDashboard/custboard";
import Customercalendar from "./scenes/customerDashboard/customerCalender";
import Engineerboard from "./scenes/engineerDashboard/engineerDashboard";
import Engineerform from "./scenes/engineerDashboard/engineerForm";
import Engprofile from "./scenes/engineerDashboard/engProfile";
import Engprojects from "./scenes/engineerDashboard/engProjects";
import Engineerbar from "./scenes/global/Engineerbar";
import Engineercalendar from "./scenes/engineerDashboard/engineerCalendar";
import Icdesignbar from "./scenes/global/IcDesignbar";
import Icboard from "./scenes/icDesign/icboard";
import Iccalendar from "./scenes/icDesign/icCalendar";
import Icform from "./scenes/icDesign/icForm";
import Customerclients from "./scenes/customerDashboard/custClients";
import Customerprojects from "./scenes/customerDashboard/custprojects";
import Domaincalendar from "./scenes/domainLeader/domaincalendar";
import Domainbar from "./scenes/global/Domainbar";
import Domainboard from "./scenes/domainLeader/domainDashboard";
import Domainprofile from "./scenes/domainLeader/domainleader";
import Domainclients from "./scenes/domainLeader/domainclient";
import Domainprojects from "./scenes/domainLeader/domainproject";
import Domainform from "./scenes/domainLeader/domainform";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const isCustomerProfileRoute = location.pathname.startsWith("/customerDashboard");
  const isEngineerDashboardRoute = location.pathname.startsWith("/engineerDashboard");
  const isICDesignerDashboardRoute = location.pathname.startsWith("/icDesign");
  const isDomainLeaderRoute = location.pathname.startsWith("/domainLeader")

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <div className="app">
          {/* Conditionally render the sidebar based on the route */}
{isCustomerProfileRoute ? <Customerbar /> : 
  (isEngineerDashboardRoute ? <Engineerbar /> : 
    (isICDesignerDashboardRoute ? <Icdesignbar /> : 
      (isDomainLeaderRoute ? <Domainbar/> : 
        (isSidebar && <Sidebar />)
      )
    )
  )
}

          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
            <Route path="/domainLeader/domainDashboard" element={<Domainboard/>}/>
              <Route path="/domainLeader/domainleader" element={<Domainprofile/>}/>
              <Route path="/domainLeader/domainproject" element={<Domainprojects/>}/>
              <Route path="/domainLeader/domaincalendar" element={<Domaincalendar/>}/>
              <Route path="/domainLeader/domainclients" element={<Domainclients/>}/>
              <Route path="/domainLeader/domainform" element={<Domainform/>}/>
              <Route path="/customerDashboard" element={<Customerprofile/>}/>

              <Route path="/customerDashboard/Clients" element={<Customerclients/>}/>
              <Route path="/customerDashboard/Projects" element={<Customerprojects/>}/>
              <Route path="/customerDashboard/customerform" element={<Customerform/>}/>
              <Route path="/customerDashboard/custboard" element={<Customerboard/>}/>
              <Route path="/customerDashboard/customerCalender" element={<Customercalendar/>}/>
              <Route path="/engineerDashboard" element={<Engineerboard/>}/>
              <Route path="/engineerDashboard/Form" element={<Engineerform/>}/>
              <Route path="/engineerDashboard/Profile" element={<Engprofile/>}/>
              <Route path="/engineerDashboard/calendar" element={<Engineercalendar/>}/>
              <Route path="/engineerDashboard/Projects" element={<Engprojects/>}/>
              <Route path="/icDesign/icboard" element={<Icboard/>}/>
              <Route path="/icDesign/icForm" element={<Icform/>}/>
              <Route path="/icDesign/icCalendar" element={<Iccalendar/>}/>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/engineers" element={<Engineers />}/>
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
