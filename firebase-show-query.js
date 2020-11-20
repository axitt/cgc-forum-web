const queries=document.querySelector('#queries');
var collapseExample="collapseExample";
var number=0;
function printqueries(doc){
    ++number;
   // let li=document.createElement('li');
   /* let br=document.createElement('br');
    let div=document.createElement('div');
    //let img=document.createElement('img');
    let div2=document.createElement('div');
    let div3=document.createElement('div');
   // let small=document.createElement('small');
    let a=document.createElement('a');
    //let p=document.createElement('p');
    //let p2=document.createElement('p');
    let a2=document.createElement('a');
    let textarea=document.createElement('textarea');
    let button=document.createElement('button');
    let hr=document.createElement('hr');*/

   var li=doc.id;
   var img=doc.data().userProfileImageUrl;
   var small=doc.data().username+"("+doc.data().createdAt.toDate()+")";
   var p=doc.data().questionTitle;
   var p2=doc.data().questionContent;
   console.log(img);

  /*  li.appendChild(div);
    div.appendChild(img);
    div.appendChild(div2);
    div2.appendChild(small);
    div2.appendChild(a);
    a.appendChild(p);
    div2.appendChild(a);
    a.appendChild(p2);
    div2.appendChild(a2);
    div2.appendChild(div3);
    div3.appendChild(textarea);
    div3.appendChild(button);
    li.appendChild(hr);*/

    $("#queries").append("<li class=\"p-2\" data-id="+li+"><br/><div class=\"media\"><img class=\"float-left user-display m-2\" alt=\"Images\" src="+img+"><div class=\"media-body\"><small class=\"text-muted\">"+small+
    "</small><a href=\"query.html?id="+li+"\"><p class=\"card-text text-left\"><strong>"+p+"</strong></p></a>"+
    "<a href=\"query.html?id="+li+"\"><p class=\"card-text text-left\">"+p2+"</p></a>"+"<a data-toggle=\"collapse\" href=#"+collapseExample+number.toString()+" aria-expanded=\"false\" aria-controls="+collapseExample+number.toString()+"><small class=\"text-muted reply-hover\"><i class=\"fa fa-reply\"></i> Reply</small></a>"+
    "<div class=\"collapse\" id="+collapseExample+number.toString()+">"+
    "<form onsubmit=\"return reply()\"><textarea type=\"text\" name=\"comment\" class=\"form-control\" rows=\"3\" id=\"comment"+number.toString()+"\"></textarea>"+"<input type=\"hidden\" name=\"id\" value="+li+">"+
    "<button type=\"submit\" class=\"btn btn-info mt-1\">Reply</button></form>"+
    "</div></div></div><hr/></li>");
}
db.collection("questions").orderBy('createdAt','desc').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
        printqueries(doc,++number);
    })
})
