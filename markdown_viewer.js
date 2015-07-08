function applyMarkdown(someMarkdownedString) {
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
