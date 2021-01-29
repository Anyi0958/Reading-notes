set repoName=
set branch=

echo 全自动上传
set /p str=全部文件更改信息记录：

::得到目录数据
for /f "tokens=4 delims=\ " %%i in ('dir ^| findstr /c:"%date:~0,10%" ^| findstr /v /c:"\."') do (
	echo %%i>>list.txt
)

::得到文件的新增数据
for /f %%i in (list.txt) do (
	
	cd %%i

	::获取新增文件名
	for /f "tokens=4 delims=\ " %%a in ('dir ^| findstr /c:"%date:~0,10%" ^| 	findstr /v /c:"DIR"') do (
		echo %%a >> ..\fileList.txt
	) 
	cd ..
)


::git add .
::逐个文件夹增加
for /f %%i in (list.txt) do (
	git add %%i
	cd %%i
	::获取新增文件名
	::git commit -am "%str%"
	::添加修改信息
	for /f "tokens=4 delims=\ " %%a in ('dir ^| findstr /c:"%date:~0,10%" ^| findstr /v /c:"DIR"') do (
		echo %%a
		git commit -m "add func: %%a in %date:~0,10%-%time%" %%a
	)
	cd ..
	
)

type list.txt >> UploadLog.txt
echo %date:~0,10%-%time% >> UploadLog.txt
echo. >> UploadLog.txt
type fileList.txt >> UploadLog.txt
echo %date:~0,10%-%time% >> UploadLog.txt
echo. >> UploadLog.txt

::获取更改名单，一行显示

for /f %%i in (fileList.txt) do (
	set /p="%%i,"<nul>>tmplist.txt
)

for /f %%i in (tmplist.txt) do (
	set tmpStr=%%i
)

echo !tmpStr:~,-1!

del list.txt fileList.txt tmplist.txt


git add .
git commit -am "modify: %str% add: !tmpStr:~,-1! in %date:~0,10%-%time% "

for /f %%i in ('git remote') do (
	echo 远程仓库名字：%%i
	set repoName=%%i
)

for /f "tokens=1,2* delims=\ " %%i in ('git branch') do (
	echo 版本：%%j
	set branch=%%j
)

echo !repoName!
echo !branch!

git push !repoName! !branch!

echo.
echo 上传完成
pause > nul
goto start