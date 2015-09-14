var MarkdownHandler = (function() {
  "use strict";

  MarkdownHandler = function() {

  }

  MarkdownHandler.prototype.toHtml = function(someMarkdownedString) {
    var theText = someMarkdownedString;

    //do the marking down

    //underline
    theText = theText.replace(/_(.+)_/g, '<span style="text-decoration:underline;">$1</span>');
    //bold
    theText = theText.replace(/\*\*(.+)\*\*/g, '<strong>$1</strong>');
    //italic
    theText = theText.replace(/\*(.+)\*/g, '<em>$1</em>');
    //lists
    theText = theText.replace(/\n--\n([\s\S]+?)--\n?/g, '<ul>$1</ul>');
    theText = theText.replace(/\n##\n([\s\S]+?)##\n?/g, '<ol>$1</ol>');
    theText = theText.replace(/[\-#] (.+)\n/g, '<li>$1</li>');
    //paragraphs
    //theText = theText.replace(/\n\n([\s\S]+)\n\n/g, '<p>$1</p>');
    //new line
    theText = theText.replace(/\n/g, '<br />');
    //links
    theText = theText.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

    return theText;
  }

  MarkdownHandler.prototype.toMarkdown = function(someHtmlString) {
    var theText = someHtmlString;

    //underline
    theText = theText.replace(/<span style="text-decoration:underline;">(.+?)<\/span>/g, '_$1_');
    //bold
    theText = theText.replace(/<strong>(.+?)<\/strong>/g, '**$1**');
    //italic
    theText = theText.replace(/<em>(.+?)<\/em>/g, '*$1*');
    //lists
    //theText = theText.replace(/<ul>([\s\S]+)<\/ul>/g, "\n--\n$1--\n");
    //theText = theText.replace(/<ol>([\s\S]+)<\/ol>/g, "\n##\n$1##\n");
    theText = theText.replace(/<\/li>/g, '</li>\n');
    // theText = theText.replace(/<li>(.+)<\/li>/g, "- $1");
    theText = theText.replace(/<ul>([\s\S]+?)<\/ul>/g, function(match, p1) {
      return '\n--\n' + p1.replace(/<li>(.+)<\/li>/g, '- $1') + '--\n';
    });
    theText = theText.replace(/<ol>([\s\S]+?)<\/ol>/g, function(match, p1) {
      return '\n##\n' + p1.replace(/<li>(.+)<\/li>/g, '# $1') + '##\n';
    });
    //paragraphs
    //theText = theText.replace(/\n\n([\s\S]+)\n\n/g, '<p>$1</p>');
    //new line
    theText = theText.replace(/<br \/>/g, "\n");
    //links
    theText = theText.replace(/<a href="(.+?)">(.+?)<\/a>/g, "[$2]($1)");

    return theText;
  }
  return MarkdownHandler;
})();
var test = document.getElementById('test');

function markdown(str){
  var element = document.getElementById(str);
  this.isElement = false;
  this.content = '';
  
  
  if (element === null) {
    this.content = str;
  } else {
    this.content = element.innerHTML;
    this.isElement = true;
  }
 
  this.render = function(){
    var content = this.content;
    
    content = this.toH6(content);
    content = this.toH5(content);
    content = this.toH4(content);
    content = this.toH3(content);
    content = this.toH2(content);
    content = this.toH1(content);
    content = this.toImg(content);
    content = this.toA(content);
    content = this.toCode(content);
    console.log(content);
  };
  
  this.toH1 = function (content) {
    return content.replace(/#(.+?)\n/g, "<h1>$1</h1>");
  };
  
  this.toH2 = function (content) {
    return content.replace(/##(.+?)\n/g, "<h2>$1</h2>");
  };
  this.toH3 = function (content) {
    return content.replace(/###(.+?)\n/g, "<h3>$1</h3>");
  };
  
  this.toH4 = function (content) {
    return content.replace(/####(.+?)\n/g, "<h4>$1</h4>");
  };
  this.toH5 = function (content) {
    return content.replace(/#####(.+?)\n/g, "<h5>$1</h5>");
  };
  this.toH6 = function (content) {
    return content.replace(/######(.+?)\n/g, "<h6>$1</h6>");
  };
  this.toA = function(content){
    return content.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  };
  this.toImg = function(content){
    return content.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');
  };
  this.toCode = function(content){
     return content.replace(/```(.+?)```/g,'<code>$1</code>');
  };
}

var markdown = new markdown('test');

markdown.render();

