const React = require('react');
const Layout = require('./Layout');

module.exports = function Test() {
  return (
    <Layout>
      <h1>Cardinal - Base - Form Elements</h1>
      <div className="demo">
        <form action="">
          <fieldset>
            <legend>Text fields</legend>
            <p>
              <label htmlFor="textinput">
                Text Input
                <abbr title="Required">*</abbr>
              </label>
              <input id="textinput" type="text" placeholder="Text Input" />
            </p>
            <p>
              <label htmlFor="passwordinput">Password</label>
              <input id="passwordinput" type="password" placeholder="Type your Password" />
            </p>
            <p>
              <label htmlFor="textarea">Textarea</label>
              <textarea id="textarea" rows="8" cols="48" placeholder="Enter your message here" />
            </p>
          </fieldset>
          <fieldset>
            <legend>Select menus</legend>
            <p>
              <label htmlFor="selectinput">Select</label>
              <select id="selectinput">
                <optgroup label="Option Group">
                  <option>Option One</option>
                  <option>Option Two</option>
                  <option>Option Three</option>
                </optgroup>
              </select>
            </p>
          </fieldset>
          <fieldset>
            <legend>Checkboxes</legend>
            <ul className="u-list-bare">
              <li>
                <label htmlFor="checkbox1">
                  <input id="checkbox1" name="checkbox" type="checkbox" checked="checked" />
                  {' '}
                  Choice A
                </label>
              </li>
              <li>
                <label htmlFor="checkbox2">
                  <input id="checkbox2" name="checkbox" type="checkbox" />
                  {' '}
                  Choice B
                </label>
              </li>
              <li>
                <label htmlFor="checkbox3">
                  <input id="checkbox3" name="checkbox" type="checkbox" />
                  {' '}
                  Choice C
                </label>
              </li>
            </ul>
          </fieldset>
          <fieldset>
            <legend>Radio buttons</legend>
            <ul className="u-list-bare">
              <li>
                <label htmlFor="radio1">
                  <input id="radio1" name="radio" type="radio" className="radio" checked="checked" />
                  {' '}
                  Option 1
                </label>
              </li>
              <li>
                <label htmlFor="radio2">
                  <input id="radio2" name="radio" type="radio" className="radio" />
                  {' '}
                  Option 2
                </label>
              </li>
              <li>
                <label htmlFor="radio3">
                  <input id="radio3" name="radio" type="radio" className="radio" />
                  {' '}
                  Option 3
                </label>
              </li>
            </ul>
          </fieldset>
          <fieldset>
            <legend>HTML5 inputs</legend>
            <p>
              <label htmlFor="telinput">Telephone</label>
              <input id="telinput" type="tel" placeholder="(555) 555-5555" />
            </p>
            <p>
              <label htmlFor="urlinput">Web Address</label>
              <input id="urlinput" type="url" placeholder="http://yoursite.com" />
            </p>
            <p>
              <label htmlFor="emailinput">Email Address</label>
              <input id="emailinput" type="email" placeholder="name@email.com" />
            </p>
            <p>
              <label htmlFor="searchinput">Search</label>
              <input id="searchinput" type="search" placeholder="Enter Search Term" />
            </p>
            <p>
              <label htmlFor="numberinput">
                Number Input
                <abbr title="Required">*</abbr>
              </label>
              <input id="numberinput" type="number" placeholder="Enter a Number" pattern="[0-9]*" />
            </p>
            <p>
              <label htmlFor="dateinput">Date input</label>
              <input type="date" id="dateinput" value="1970-01-01" />
            </p>
            <p>
              <label htmlFor="monthinput">Month input</label>
              <input type="month" id="monthinput" value="1970-01" />
            </p>
            <p>
              <label htmlFor="weekinput">Week input</label>
              <input type="week" id="weekinput" value="1970-W01" />
            </p>
            <p>
              <label htmlFor="datetimeinput">Datetime input</label>
              <input type="datetime" id="datetimeinput" value="1970-01-01T00:00:00Z" />
            </p>
            <p>
              <label htmlFor="datetimelocalinput">Datetime-local input</label>
              <input type="datetime-local" id="datetimelocalinput" value="1970-01-01T00:00" />
            </p>
            <p>
              <label htmlFor="colorinput">Color input</label>
              <input type="color" id="colorinput" value="#000000" />
            </p>
            <p>
              <label htmlFor="rangeinput">Range input</label>
              <input type="range" id="rangeinput" value="10" />
            </p>
          </fieldset>
        </form>
      </div>
    </Layout>
  );
};
