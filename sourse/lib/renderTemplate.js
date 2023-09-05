const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = function renderTemplate(components, props, res) {
  const home = React.createElement(components, props);

  const html = ReactDOMServer.renderToStaticMarkup(home);

  res.write('<!DOCTYPE html>');
  res.end(html);
}
