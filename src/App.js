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
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const isCustomerProfileRoute = location.pathname.startsWith("/customerDashboard");
  const isEngineerDashboardRoute = location.pathname.startsWith("/engineerDashboard");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <div className="app">
          {/* Conditionally render the sidebar based on the route */}
          {isCustomerProfileRoute ? <Customerbar /> : (isEngineerDashboardRoute ? <Engineerbar /> : <Sidebar isSidebar={isSidebar} />)}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/customerDashboard" element={<Customerprofile/>}/>
              <Route path="/customerDashboard/customerform" element={<Customerform/>}/>
              <Route path="/customerDashboard/custboard" element={<Customerboard/>}/>
              <Route path="/customerDashboard/customerCalender" element={<Customercalendar/>}/>
              <Route path="/engineerDashboard" element={<Engineerboard/>}/>
              <Route path="/engineerDashboard/engineerForm" element={<Engineerform/>}/>
              <Route path="/engineerDashboard/engProfile" element={<Engprofile/>}/>
              <Route path="/engineerDashboard/engProjects" element={<Engprojects/>}/>
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
