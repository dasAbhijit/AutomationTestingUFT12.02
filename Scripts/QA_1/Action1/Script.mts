sTestDir = Environment.Value ("TestDir")  'Finding Script UFT file directory
arrPath = Split(sTestDir, "\")
arrPath(UBound(arrPath)-1) = "Library"
For I=0 to UBound(arrPath) -1
	If (I=0) Then
		strLibPath = arrPath(I)
	Else
		strLibPath = strLibPath + "\" + arrPath(I)
	End If
Next

strCommLibPath = strLibPath & "\" & "CommonLib.vbs"
strAppLibPath = strLibPath & "\" & "AppLib.vbs"
strReportLibPath = strLibPath & "\" & "ReportLib.vbs"

Set qtApp = CreateObject("QuickTest.Application") 			' Create the Application object
Set qtLibraries = qtApp.Test.Settings.Resources.Libraries   ' Get the libraries collection object

If qtLibraries.Find(strCommLibPath) = -1 Then               ' returns 1 if lib is associated else -1
	ExecuteFile strCommLibPath 
End If
If qtLibraries.Find(strAppLibPath) = -1 Then
	ExecuteFile strAppLibPath
End If
If qtLibraries.Find(strReportLibPath) = -1 Then
	ExecuteFile strReportLibPath
End If
Set qtApp = Nothing
Set qtLibraries = Nothing
''''''''''''''''''create global variables & Loads common repository
Initialization ()

''''''''''''''''''Call function to create HTML test script execution result.
CreateResultFile()

'''''''''''''Call function to Invoke Browser and load application URL
return = InvokeBrowser ()
If return = True Then
	LogResult micPass , "Invoke Browser" , "Passed"
Else
	LogResult micFail , "Invoke Browser" , "Failed"
	testCleanUp()
 	ExitTest
End If

'--------------------------Login - Using Library Function-------------------------'
Browser("Welcome: Mercury Tours").Page("Find a Flight: Mercury").Sync
If Browser("Welcome: Mercury Tours").Page("Find a Flight: Mercury").Image("img_flightfinder").Exist(3) Then
	LogResult micPass , "Login : " , "Passed"
Else
	LogResult micFail , "Login : " , "Failed"
	testCleanUp()
 	ExitTest
End If

'-------------------------------------------------------------------------'
'----------------------- TEST SCRIPT STARTS-------------------------------'
'-------------------------------------------------------------------------'

 testCleanUp()
