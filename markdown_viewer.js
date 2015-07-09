function toHtml(someMarkdownedString) {
  var theText = someMarkdownedString;

  //do the marking down

  //underline
  theText = theText.replace(/_(.+)_/g, '<span style="text-decoration:underline;">$1</span>');
  //bold
  theText = theText.replace(/\*\*(.+)\*\*/g, '<strong>$1</strong>');
  //italic
  theText = theText.replace(/\*(.+)\*/g, '<em>$1</em>');
  //lists
  theText = theText.replace(/\n--\n([\s\S]+)--\n?/g, '<ul>$1</ul>');
  theText = theText.replace(/\n##\n([\s\S]+)##\n?/g, '<ol>$1</ol>');
  theText = theText.replace(/[\-#] (.+)\n/g, '<li>$1</li>');
  //paragraphs
  //theText = theText.replace(/\n\n([\s\S]+)\n\n/g, '<p>$1</p>');
  //new line
  theText = theText.replace(/\n/g, '<br />');
  //links
  theText = theText.replace(/\[(.+)\]\((.+)\)/g, '<a href="$2">$1</a>');

  return theText;
}

function toMarkdown(someHtmlString) {
  var theText = someHtmlString;

  //underline
  theText = theText.replace(/<span style="text-decoration:underline;">(.+)<\/span>/g, '_$1_');
  //bold
  theText = theText.replace(/<strong>(.+)<\/strong>/g, '**$1**');
  //italic
  theText = theText.replace(/<em>(.+)<\/em>/g, '*$1*');
  //lists
  //theText = theText.replace(/<ul>([\s\S]+)<\/ul>/g, "\n--\n$1--\n");
  //theText = theText.replace(/<ol>([\s\S]+)<\/ol>/g, "\n##\n$1##\n");
  theText = theText.replace(/<\/li>/g, '</li>\n');
  // theText = theText.replace(/<li>(.+)<\/li>/g, "- $1");
  theText = theText.replace(/<ul>([\s\S]+)<\/ul>/g, function(match, p1) {
    return '\n--\n' + p1.replace(/<li>(.+)<\/li>/g, '- $1') + '--\n';
  });
  theText = theText.replace(/<ol>([\s\S]+)<\/ol>/g, function(match, p1) {
    return '\n##\n' + p1.replace(/<li>(.+)<\/li>/g, '# $1') + '##\n';
  });
  //paragraphs
  //theText = theText.replace(/\n\n([\s\S]+)\n\n/g, '<p>$1</p>');
  //new line
  theText = theText.replace(/<br \/>/g, "\n");
  //links
  theText = theText.replace(/<a href="(.+)">(.+)<\/a>/g, "[$2]($1)");

  return theText;
}
