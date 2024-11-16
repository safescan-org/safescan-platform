import React, { createContext, useState } from 'react'
export const SidebarContext = createContext()

const SidebarContextProvider = ({ children }) => {
  // -------------handle elderly back button and elderly trends click------------
  const [innerOverView, setinnerOverView] = useState(true)
  const [activeTrend, setActiveTrend] = useState({title:"Fall Detection", index:1})

  // --------------show notification tab------------
  const [showNotificationTab,setShowNotificationTab]=useState(false)

  // -------------inner device show---------------
  const [deviceInner,setDeviceInner]=useState('');

  const [show, setShow] = useState(false)
  const [sidebarShow,setSidebarShow] = useState(false)
  const [overView, setOverView] = useState(true)
  const [overViewActive, setOverViewActive] = useState("")
  const [BreadCrumbData,setBreadCrumb] = useState({title:"",url:""})
  const contextInfo = {
    show,
    setShow,
    overView,
    setOverView,
    overViewActive,
    setOverViewActive,
    setinnerOverView,
    innerOverView,
    activeTrend,
    setActiveTrend,
    sidebarShow,
    setSidebarShow,
    setDeviceInner,
    deviceInner,
    setShowNotificationTab,
    showNotificationTab,
    setBreadCrumb,
    BreadCrumbData,
  }

  return (
    <SidebarContext.Provider value={contextInfo}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider