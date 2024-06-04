import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
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
import Icprofile from "./scenes/icDesign/icdesign";
import Domaincalendar from "./scenes/domainLeader/domaincalendar";
import Domainbar from "./scenes/global/Domainbar";
import Domainboard from "./scenes/domainLeader/domainDashboard";
import Domainprofile from "./scenes/domainLeader/domainleader";
import Domainprojects from "./scenes/domainLeader/domainproject";
import Domainform from "./scenes/domainLeader/domainform";
import Icclients from "./scenes/icDesign/icClients";
import Icprojects from "./scenes/icDesign/icProjects";
import SigninPage from "./scenes/signin";
import Customerapproved from "./scenes/team/approved";
import CustomerUser from "./scenes/customerDashboard/customerProfile";
import Customerprogress from "./scenes/team/inprogress";
import Customerrejected from "./scenes/team/rejected";
import CustomerRequest from "./scenes/customerDashboard/customerRequest";
import CustomerAdminProfile from "./scenes/team";
import CustomerRequirements from "./scenes/team/requests";
import Engineerprogress from "./scenes/engineers/inprogress";
import EngineerApproved from "./scenes/engineers/approved";
import EngineerRejected from "./scenes/engineers/rejected";
import DomainAdminProfile from "./scenes/domainAdmin";
import Domainprogress from "./scenes/domainAdmin/inprogress";
import DomainApproved from "./scenes/domainAdmin/approved";
import DomainRejected from "./scenes/domainAdmin/rejected";
import IcAdminProfile from "./scenes/designAdmin";
import IcAdminProgress from "./scenes/designAdmin/inprogress";
import IcAdminApproved from "./scenes/designAdmin/approved";
import IcAdminRejected from "./scenes/designAdmin/rejected";
import Profile from "./scenes/profile";
import CustomerIc from "./scenes/customerDashboard/customerIc";
import CustomerDomainLeader from "./scenes/customerDashboard/cusotmerDl";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const isCustomerProfileRoute = location.pathname.startsWith("/customerDashboard");
  const isEngineerDashboardRoute = location.pathname.startsWith("/engineerDashboard");
  const isICDesignerDashboardRoute = location.pathname.startsWith("/icDesign");
  const isDomainLeaderRoute = location.pathname.startsWith("/domainLeader");
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <div className="app">
       {/* Conditionally render the sidebar based on the route */}
          {isAuthPage ? null :
            (isCustomerProfileRoute ? <Customerbar /> :
              (isEngineerDashboardRoute ? <Engineerbar /> :
                (isICDesignerDashboardRoute ? <Icdesignbar /> :
                  (isDomainLeaderRoute ? <Domainbar /> :
                    (isSidebar && <Sidebar />)
                  )
                )
              )
            )
          }

          <main className="content">
          {!isAuthPage && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              {/* ........Domain Dashboard Routes....... */}
            <Route path="/domainLeader/domainDashboard" element={<Domainboard/>}/>
              <Route path="/domainLeader/domainleader" element={<Domainprofile/>}/>
              <Route path="/domainLeader/domainproject" element={<Domainprojects/>}/>
              <Route path="/domainLeader/domaincalendar" element={<Domaincalendar/>}/>
              <Route path="/domainLeader/domainform" element={<Domainform/>}/>


              {/*.........Customer Dashboard Routes...... */}
              <Route path="/customerDashboard" element={<Customerprofile/>}/>
              <Route path="/customerDashboard/customerRequest" element={<CustomerRequest/>}/>
              <Route path="/customerDashboard/customerform" element={<Customerform/>}/>
              <Route path="/customerDashboard/custboard" element={<Customerboard/>}/>
              <Route path="/customerDashboard/customerCalender" element={<Customercalendar/>}/>
              <Route path="/customerDashboard/CustomerUser" element={<CustomerUser/>}/>
              <Route path="/customerDashboard/ic" element={<CustomerIc/>}/>
              <Route path="/customerDashboard/dl" element={<CustomerDomainLeader/>}/>


              {/*.........Engineer Dashboard Routes...... */}
              <Route path="/engineerDashboard" element={<Engineerboard/>}/>
              <Route path="/engineerDashboard/Form" element={<Engineerform/>}/>
              <Route path="/engineerDashboard/Profile" element={<Engprofile/>}/>
              <Route path="/engineerDashboard/calendar" element={<Engineercalendar/>}/>
              <Route path="/engineerDashboard/Projects" element={<Engprojects/>}/>

              {/* ........IC Design Dashboard Routes..... */}
              <Route path="/icDesign/icboard" element={<Icboard/>}/>
              <Route path="/icDesign/icdesign" element={<Icprofile/>}/>
              <Route path="/icDesign/icClients" element={<Icclients/>}/>
              <Route path="/icDesign/icProjects" element={<Icprojects/>}/>
              <Route path="/icDesign/icForm" element={<Icform/>}/>
              <Route path="/icDesign/icCalendar" element={<Iccalendar/>}/>

              {/* ........Sign-Up..... */}
              <Route path="/signup" element={<SignupPage />} />

              {/* ........Sign-In..... */}
              <Route path="/signin" element={<SigninPage/>}/>

              {/* ........Admin Routes...... */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/team/requests" element={<CustomerRequirements />} />
              <Route path="/team" element={<CustomerAdminProfile />} />
              <Route path="/team/approved" element={<Customerapproved />} />
              <Route path="/team/inprogress" element={<Customerprogress/>}/>
              <Route path="/team/rejected" element={<Customerrejected/>}/>


              <Route path="/engineers" element={<Engineers />}/>
              <Route path="/engineers/inprogress"  element={<Engineerprogress/>}/>
              <Route path="/engineers/approval"  element={<EngineerApproved/>}/>
              <Route path="/engineers/rejected"  element={<EngineerRejected/>}/>


              <Route path="/domain" element={<DomainAdminProfile />}/>
              <Route path="/domain/inprogress" element={<Domainprogress />}/>
              <Route path="/domain/approved" element={<DomainApproved />}/>
              <Route path="/domain/rejected" element={<DomainRejected />}/>


              <Route path="/design" element={<IcAdminProfile />}/>
              <Route path="/design/approved" element={<IcAdminApproved />}/>
              <Route path="/design/inprogress" element={<IcAdminProgress />}/>
              <Route path="/design/rejected" element={<IcAdminRejected />}/>



              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              

              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/profile" element={<Profile />} />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
