window.addEventListener('load',()=>{
    const params=(new URL(document.location)).searchParams;
    const id=params.get('id');
    const reply=document.querySelector('#replies');
    console.log(id);
    db.collection("questions").doc(id).get().then(function(doc){
        console.log(doc.data().username);
        $("#profile-pic").attr('src',doc.data().userProfileImageUrl);
        $('#info').html(doc.data().username+"("+doc.data().createdAt.toDate()+")");
        $('#title').html(doc.data().questionTitle);
        $('#content').html(doc.data().questionContent);
        $('#query-id').val(id);
        $('#query-id2').val(id);
        function showreply(doc){
            if(!doc)
            {
                document.getElementById('answers').innerHTML="0";
            }
            console.log(doc.data().responseText);
            $('#replies').append("<div class=\"media\"><img class=\"float-left user-display m-2\" src="+doc.data().userProfileImageUrl+"><div class=\"media-body\"><small class=\"text-muted\">"+doc.data().userName+"("+doc.data().createdAt.toDate()+")"+"</small><p class=\"text-primary\">"+doc.data().responseText+"</p></div></div>");
        }
        db.collection('questions').doc(id).collection('responses').orderBy('createdAt','asc').get().then((snapshot)=>{
            snapshot.docs.forEach(doc=>{
                showreply(doc);
            })
        })
    })
})

const queries=document.querySelector('#queries');
var collapseExample="collapseExample";
var number=0;
function printqueries(doc){
    ++number;

   var li=doc.id;
   var img=doc.data().userProfileImageUrl;
   var small=doc.data().username+"("+doc.data().createdAt.toDate()+")";
   var p=doc.data().questionTitle;
   var p2=doc.data().questionContent;
   console.log(img);

    $("#queries").append("<li class=\"p-2\" data-id="+li+"><br/><div class=\"media\"><img class=\"float-left user-display m-2\" alt=\"Images\" src="+img+"><div class=\"media-body\"><small class=\"text-muted\">"+small+
    "</small><a href=\"query.html?id="+li+"\"><p class=\"card-text text-left\"><strong>"+p+"</strong></p></a>"+
    "<a href=\"query.html\"><p class=\"card-text text-left\">"+p2+"</p></a>"+"<a data-toggle=\"collapse\" href=#"+collapseExample+number.toString()+" aria-expanded=\"false\" aria-controls="+collapseExample+number.toString()+"><small class=\"text-muted reply-hover\"><i class=\"fa fa-reply\"></i> Reply</small></a>"+
    "<div class=\"collapse\" id="+collapseExample+number.toString()+">"+
    "<form onsubmit=\"return reply()\"><input type=\"text\" name=\"comment\" class=\"form-control\" rows=\"3\" id=\"comment"+number.toString()+"\">"+"<input type=\"hidden\" name=\"id\" value="+li+">"+
    "<button type=\"submit\" class=\"btn btn-info mt-1\">Reply</button></form>"+
    "</div></div></div><hr/></li>");
}
db.collection("questions").orderBy('createdAt','desc').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
        printqueries(doc,++number);
    })
})
