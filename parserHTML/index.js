function parser(template, option) {
  let html = template;
  let start = 0;
  const stack = [];

  const startTag = /^<$/;
  const endTag = /<\/(.+)>/;
  while (html) {
    if (html.match(endTag)) {
      const [str, tag] = html.match(endTag);
      start = str.length;
    } else if (html.match(startTag)) {
      
    }

    let rest = html.split(start);
    html = rest;
  }
}

const template = `<div id="btn" class="primary" v-if="true"><span>确认</span></div>`;

parser(template, {
  start() {},
  end() {},
  comment() {},
  chars() {},
});
