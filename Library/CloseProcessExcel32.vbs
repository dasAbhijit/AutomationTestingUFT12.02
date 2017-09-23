   Set objWMIService = GetObject("winmgmts:{impersonationLevel=impersonate}" & "!\\.\root\cimv2")
   Set colProcess = objWMIService.ExecQuery ("Select * From Win32_Process")
   For Each objProcess in colProcess
      If LCase(objProcess.Name) = LCase("EXCEL.EXE") OR LCase(objProcess.Name) = LCase("EXCEL.EXE *32") Then
         objProcess.Terminate()
        ' MsgBox "- ACTION: " & objProcess.Name & " terminated"
      End If
   Next
   