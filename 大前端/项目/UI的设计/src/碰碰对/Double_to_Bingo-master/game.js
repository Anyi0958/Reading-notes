/**
 * Created by FengZhen on 2017/8/19.
 */
window.onload=function()
{
    var oBack=document.getElementsByTagName('div')[0];
    var oDiv=oBack.getElementsByTagName('div');
    var oLi=document.getElementsByClassName('cover');

    var j=0;        //简单的变量，使用在循环给div设置背景
    var i=0;        //简单的变量，使用在循环给div设置背景
    var k=0;        //简单的变量，点击cover计数，检测是否已经显示两张水果图片
    var a=0;        //简单的变量，存放单次点击的图片的mark值
    var b=0;       //简单的变量，存放双次点击的图片的mark值
    var c=0;       //简单的变量，用来计数，判断是否完成
    var d=0;

    var this1=null;     //存放双次点击的时候相对应的div
    var this2=null;     //存放单次点击的时候相对应的div


    /*-------------通过循环给每一个div设置一些标志属性-------------*/
    for(i=0;i<oDiv.length;i++)
    {
        oDiv[i].hit=0;              //给每一个div添加一个标志属性，当hit为0的时候，表示该图片没有点击
        oDiv[i].backMark=0;         //给每一个div添加一个标志属性，当backMark为0的时候，表示图片未设置
    }


    /*-------------使用随机数通过循环给每一个div设置背景-------------*/
    i=1;
    while (i<37)
    {
        var num=parseInt(Math.random()*36,10);           //随机产生一个18-36之间的数字
        if(oDiv[num].backMark==0)                       //当前div未设置背景图片，则进行背景图片的设置
        {
            oDiv[num].backMark=1;                       // 当前div已设置背景图片
            oDiv[num].style.backgroundImage="url(images/"+i+".jpg)";
            if(i>18)
            {
                a=i-18;
            }
            else
            {
                a=i;
            }
            oDiv[num].mark=a;                           //给每一个div加一个标志，如果两个div的水果相同，则标志相同
            i++;
        }
    }

    /*-------------点击每一个背景显示水果图片-------------*/

    for(i=0;i<oDiv.length;i++)
    {
        oDiv[i].onclick=function()
        {
            /*-------------使用ab跟别存放单双次点击图片的mark值-------------*/
            if(this.hit==0)
            {
                if(k%2==0)
                {
                    startMove(this.getElementsByTagName('li')[0],{'width':0,'height':0});
                    b=this.mark;
                    this1=this;
                }
                else
                {
                    startMove(this.getElementsByTagName('li')[0],{'width':0,'height':0});
                    a=this.mark;
                    this2=this;
                }
            }

            if(this.hit==0)
            {
                k++;                      //每点击一次，k加1
            }
            this.hit=1;           //当该图片被点击之后，hit值为1
            if(k%2==0)
            {
                if(a==b)          //当两张图片相同的时候，则两张图片消失
                {
                    c=c+2;
                    setTimeout(function(){

                        /*-------------两张图片相同的时候，将他们的cover恢复，且设置为同底色一样的颜色-------------*/
                        this1.getElementsByTagName('li')[0].style.width='100px';
                        this1.getElementsByTagName('li')[0].style.height='100px';
                        this1.getElementsByTagName('li')[0].style.background='#c1d7ae';
                        this2.getElementsByTagName('li')[0].style.width='100px';
                        this2.getElementsByTagName('li')[0].style.height='100px';
                        this2.getElementsByTagName('li')[0].style.background='#c1d7ae';


                        startMove(this1.getElementsByTagName('li')[0],{'width':100,'height':100});
                        startMove(this2.getElementsByTagName('li')[0],{'width':100,'height':100});
                    },1000);

                    if(c==36)
                    {
                        setTimeout(function(){
                            for(d=0;d<oDiv.length;d++)
                            {
                                startMove(oDiv[d].getElementsByTagName('li')[0],{'width':0,'height':0});
                            }
                        },2000)
                    }
                }
                else            //当两张图片不一样的时候，两张图片的cover恢复
                {
                    setTimeout(function(){
                        startMove(this1.getElementsByTagName('li')[0],{'width':100,'height':100});
                        startMove(this2.getElementsByTagName('li')[0],{'width':100,'height':100});
                    },500);
                    this1.hit=0;        //两张图片不一样，则使hit变为0，图片处于未点击状态
                    this2.hit=0;
                }
            }

        }
    }
};




