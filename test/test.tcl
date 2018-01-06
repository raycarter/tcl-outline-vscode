
#****f* test/test
# NAME
#  useMsgBox
# DESCRIPTION
#  nothing important
# AUTHOR
#  SL
# CREATION DATE 
#  11.12.2016
proc useMsgBox {msg} {
  global globStrings
  tk_messageBox -icon error -title [msg_get "Server:"]  -message "$msg"
}

#****f* test/test
# NAME
#  sendErrorToServer
# DESCRIPTION
#  nothing important
# AUTHOR
#  SL
# CREATION DATE 
#  11.12.2016
proc sendErrorToServer {msg error} {
  global errorInfo
  set clockseconds [clock seconds]
  set txt [msg_get "Error "]
  append txt $clockseconds
  set errordisplay "$txt\n $msg"
  set errorlog "$msg - $error - $errorInfo"
  set errorextendedlog "CLIENT VARIABLES [errorvariables]"
  client_send [list write2errorlog $clockseconds $errorlog $errorextendedlog errorwriterresult]
}

#****f* test/test
# NAME
#  hideSomething
# DESCRIPTION
#  nothing important
# AUTHOR
#  SL
# CREATION DATE 
#  11.12.2016
proc hideSomething {} {
  global globVars globConst
  if {[winfo exists $globConst(workframe)]} {
    pack forget $globConst(workframe)
    pack forget $globConst(toolframe)
    pack forget $globConst(sepframe)
    MenuDisable $globConst(menuframe)
  }
}

#****f* test/test
# NAME
#  onlyOne
# DESCRIPTION
#  nothing important
# AUTHOR
#  SL
# CREATION DATE 
#  11.12.2016
proc onlyOne eee {}





