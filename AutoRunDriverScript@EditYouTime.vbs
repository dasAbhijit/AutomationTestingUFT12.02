d=now()
Dim arr(4)
Set objShell = Wscript.CreateObject("WScript.Shell")
Do
	d=now()
	arr(0)=DatePart("d",d)
	arr(1)=DatePart("m",d)
	arr(2)=DatePart("yyyy",d)
	arr(3)=DatePart("h",d)
	arr(4)=DatePart("n",d)
	strFormatNowDate= Join(arr,"_")
	If strFormatNowDate = "19_9_2017_16_30" Then
		Exit do
	End If
	objShell.SendKeys "{~}"
Loop 
Dim objShell
objShell.Run "DriverScript.vbs" 
' Using Set is mandatory
Set objShell = Nothing
