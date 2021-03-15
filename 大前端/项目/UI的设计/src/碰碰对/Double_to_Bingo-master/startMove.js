/**
 * Created by FengZhen on 2017/8/19.
 */


/*------------------------获取当前元素的行间样式或者外部样式------------------------*/
function getStyle(obj, name)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[name];
    }
    else
    {
        return getComputedStyle(obj, false)[name];
    }
}


//startMove(oDiv, {width: 400, height: 400})


function startMove(obj, json, fnEnd)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var bStop=true;       //假设：所有值都已经到了

        /*------------------------使用json，使得宽度，高度，透明度等属性可以同时变化，且当一个不会相互影响------------------------*/
        for(var attr in json)
        {
            var cur=0;

            if(attr=='opacity')
            {
                cur=Math.round(parseFloat(getStyle(obj, attr))*100);
            }
            else
            {
                cur=parseInt(getStyle(obj, attr));
            }

            var speed=(json[attr]-cur)/6;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);

            if(cur!=json[attr])          //判断json中的元素属性是否全都已经完成了预定义的运动
                bStop=false;

            if(attr=='opacity')
            {
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed)/100;
            }
            else
            {
                obj.style[attr]=cur+speed+'px';
            }
        }

        if(bStop)
        {
            clearInterval(obj.timer);

            if(fnEnd)fnEnd();
        }
    }, 30);
}

