目录：
[TOC]
***
# 前言
- 基于`batch`和`powershell`制作
- 如果有可能，请学习`Python`

# 功能
## 1. 开启`powershell`的脚本功能
- 用管理员权限打开`cmd`
- 输入：`powershell -command "& { Set-ExecutionPolicy Unrestricted }"`
此指令为开启执行权限。
- 开启权限后，成功不会有返回信息，失败会报错
## 2. 制作`bat`的脚本触发器
制作查询热词，以`txt`保存，推荐名字改为`List.txt`：
![1-searchList][01]
制作`bat`脚本：
- 文件保存时，以`ANSI`保存，否则会出现乱码
- 推荐文件名保存为`trigger.bat`
```bat
@echo off && setlocal enabledelayedexpansion
:start
REM 如果管理员权限打开，位置会更改，需要在此声明你的位置
set /p "dirpath=bat所在位置："
cd %dirpath%
REM 指明要查询词汇的列表
set /p "FILE=输入你的文件地址："
if "%FILE%"=="" goto start
REM 结果存放的位置
set /p "RESULT=结果存放地址："
if "%RESULT%"=="" goto start
REM 查询结果保存的页数
set /p "Pages=搜索的页数：(1-5页可以写成1..5)"
if "%Pages%"=="" goto start
REM 此处为用powershell脚本，并给定参数
REM 第一个参数是存放地址，第二个参数是页码
powershell -file GetAll.ps1 %FILE% %RESULT% %Pages%

echo.
echo 结束
pause>nul
```
## 3. 深入`Powershell`脚本
```powershell
# 功能函数化，增加扩展性
function RandomNum(){
    # 指定函数的参数，类型、个数
    param(
        [Parameter(Mandatory)]
        [int]
        $Num,
        [Parameter(Mandatory)]
        [int]
        $Lth
    )
    # 初始化时，声明全局变量
    begin {
        $arr= @()
    }
    # 每次执行时，执行的区块
    process {

        for($i=0; $i -le 10; $i++){
            $RandomNum = Get-Random -Minimum 0 -Maximum $Lth
            if($arr.Contains($RandomNum)){
                continue
            }else {
                $arr+=$RandomNum
            }

            if($arr.length -eq $Num){
                break;
            }

        }

        return $arr
    }

}

function GetData() {
    param(
    [Parameter(Mandatory)]
    [string]
    $Path,
    [Parameter(Mandatory)]
    [string]
    $Result,
    [Parameter(ValueFromPipeline=$true)]
    [int]
    $Pages,
    [Parameter(Mandatory)]
    [string]
    $keys
    )

    process {
            #$_
            #url: https://data.chinaz.com/
            #search: /keyword/analysis/
            # https://data.chinaz.com/keyword/analysis/%E6%96%97%E9%B1%BC
            # https://data.chinaz.com/keyword/allindex/%E6%96%97%E9%B1%BC/1

            $url = "https://data.chinaz.com/keyword/allindex/$keys/$Pages"
            # 模拟Get方法
            $web = Invoke-WebRequest -Uri $url -Method Get     
            # 正则获取指定内容
            $context = ([regex]"(?s)pagedivid.+?<div>").Matches($web.content)                         
            ([regex]"col-220.+?li>").Matches($context) | ForEach-Object {
                $global:keywords += ([regex]"href.+?>(.+?)</a>").Matches($_)[0].Groups[1].value
                echo $keywords
            }
        }

}

# 主函数
#获取bat中传来的两个参数
$Path = $args[0]
$Result = $args[1]
# 指定页码可以从1..3变成1,2,3
$Pages = Invoke-Expression $args[2]

# 对结果的存储和记录
Get-Content $Path | ForEach-Object {
    $global:keywords = @()
    $global:RandomNum = @()
    $_
    $Pages | GetData -Path $Path -Result $Result -keys $_

    Write-Host $global:keywords.Length -BackgroundColor Red
    #Write-Host $global:keywords -BackgroundColor Red

    $global:RandomNum = RandomNum -Lth $global:keywords.Length -Num 3

    $String = $global:keywords[$global:RandomNum[0]] +"_"+ $global:keywords[$global:RandomNum[1]] +"_"+ $global:keywords[$global:RandomNum[2]]

    Write-Host $String -BackgroundColor Red -ForegroundColor Cyan
    Write-Output $String | Out-File -Append $Result
}
```

## 4. 效果展示
`bat`效果：
![2-bat][02]
查询结果：
![3-process][03]


***
[01]: ./img/1-searchList.png "1-searchList"
[02]: ./img/2-bat.png "2-bat"
[03]: ./img/3-process.png "3-process"