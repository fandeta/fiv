
import "./article.css"
import ScrollToTop from "../scrollToTop/scrollToTop";
import CodeBlock from "./CodeBlock";
import Header from "./shared/header"
import Auther from "./shared/auther"
import Aside from "./shared/aside"
import ArticlePart from "./shared/articlePart"
import Footer from "./shared/footer"


export default function XSS() {
  return (
    <>
      <ScrollToTop/> {/* Scroll To Top Button */}
      <Header articleName="SQL Injection" LabName="SQL Injection Labs"/>
      <Auther autherName="Waleed Sameer" readTime="5" imageSrc="/imgs/hacker.png"><span>SQL</span> <span>I</span>njection</Auther>
      <Aside/>
      <ArticleContent/>
    </>
  )
}

function ArticleContent() {
  return (
      <>
        <article>
          <ArticlePart className="bug-definition">
            <h4>1. What's The SQL Injection Vulnerability?</h4>
            <div>
              <p>
                SQL Injection (SQLi) is a <b>critical web security vulnerability,</b>
                that allows attackers to manipulate SQL queries executed by a web application.
                <br />
                This can lead to unauthorized access, data theft, modification, or even full database control.
                <br />
              </p>
              <br />
              <p>
                Imagine you ask a cashier for your account balance, but instead, you trick them by saying:
                <br />
                <b>"Give me everyone's account balances!"</b>
                <br />
                The cashier doesn't verify your identity and hands over all the money records, <b>This is how SQL Injection works!</b>
              </p>
              <br />
              <p>
                <b># If The website's login system executes this SQL query:</b>
              </p>
                <CodeBlock language={"sql"} code={`SELECT * FROM users WHERE username = '$user' AND password = '$pass';`}/>
              <p>
                <b>Now, What If a Hacker inputs <span className="highlighted">' OR ' 1 ' = ' 1</span> as the password Like this:</b>
              </p>
              <CodeBlock language={"sql"} code={`SELECT * FROM users WHERE username = 'admin' AND password = '' OR '1'='1';`}/>
              <p>
                <b>Now, Since <span className="highlighted">' 1 ' = ' 1 ' </span> is always true, the database logs in the attacker without needing the correct password!</b>
                <br />
                <b style={{fontSize: "20px", marginTop: "7px", display: "block"}}>- # Then, Its a <mark>Disaster</mark> broo!</b>
              </p>
            </div>
          </ArticlePart>
          <ArticlePart className="when-happens">
            <h4>2. When and Why Does SQL Injection Happen?</h4>
            <div>
              <p>
                <b>- SQL Injection occurs when:</b>
              </p>
                <ul>
                  <li>User input is inserted directly into SQL queries without validation.</li>
                  <li>Developers use string concatenation (<span className="highlighted"> " </span> or <span className="highlighted"> ' </span>) instead of prepared statements.</li>
                  <li>The database <b>executes unfiltered input</b>, allowing attackers to inject SQL commands.</li>
                  <li>Showing Error messages expose database details that help attackers craft better exploits.</li>
                </ul>
              <br />
              <p>
                <b>-  Where're The Commonly vulnerable sql injection places :</b>
              </p>
                <ul>
                  <li>Login forms</li>
                  <li>Search bars</li>
                  <li>URL parameters</li>
                  <li>Contact forms (blind SQli)</li>
                  <li>Any Field Potential to Deals in SQL Queries. </li>
                </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="risks-impact">
            <h4>3. What're The Risks and Impact of SQL Injection?</h4>
            <div>
              <p> 
                <b> - SQL Injection Is Dangours Vulnerability and has a lot of Risks Like :</b>
              </p>
              <ul>
                <li>
                  <b>Bypass Authentication</b> - Attackers log in without valid credentials.
                </li>
                <li>
                  <b>Dump Sensitive Data</b> - Expose usernames, passwords, credit card details, etc.
                </li>
                <li>
                  <b>Modify or Delete Data</b> - Attackers can change, insert, or delete records.
                </li>
                <li>
                  <b>Database Takeover</b> - If the database user has high privileges, attackers can execute system commands.
                </li>
                <li>
                  <b> Server Compromise</b> - SQLi can be used to gain shell access and execute OS commands.
                </li>
              </ul>
              <br />
              <p>
                <b># Real Life Example - In 2019 The SQL Injection in Facebook</b>
                <br />
                <br />
                - A vulnerability in Facebook's developer APIs allowed attackers to extract user data using SQL Injection.
                <br />
                It exposed personal information of millions of users.
              </p>
            </div>
          </ArticlePart>
          <ArticlePart className="real-exploitation">
            <h4>4. What're Real Scenarios and Exploitation Examples?</h4>
            <div>
              <p>
                <b style={{fontSize: "1.3em", display: "block"}}>1. Extracting User Credentials </b>
                <br />
              </p>
              <p>Let's suppose the Website has Feature To show all user Comments, With This Query</p>
              <CodeBlock language={`php`} code={`$query = "SELECT * FROM users WHERE username = '" . $_GET['user'] . "'";`}/>
              <p>and If The Hacker inputs:</p>
              <CodeBlock language={`sql`} code={`' OR '1'='1`}/>
              <p>That's Will make the Finaly shape of Query being like this : </p>
              <CodeBlock language={`sql`} code={`SELECT * FROM users WHERE username = '' OR '1'='1';`}/>
              <p>- Then, Now Its will getting all user records! </p>
              <br />
              <p>
                <b style={{fontSize: "1.3em", display: "block"}}>2. Retrieving Database Information</b>
                <br />
                If the website displays detailed error messages, the hacker can doing this : 
              </p>
              <CodeBlock language={"sql"} code={`' UNION SELECT database(), version(), user(); --`}/>
              <p>And If Success, Will Return this : </p>
              <CodeBlock language={"bash"} code={`+----------------+-----------+---------------+\n|  database_name |  version  | current_user   |\n+----------------+-----------+---------------+\n|  my_database   |  8.0.22   | root@localhost |\n+----------------+-----------+---------------+`}/>
              <p>Now, <b>the attacker knows the database name, version, and user privileges!</b></p>
              <br />
              <p>
                <b style={{fontSize: "1.3em", display: "block"}}>3. Deleting an Entire Table </b>
                <br />
                If a website executes This To delete an user :
              </p>
                <CodeBlock language={"php"} code={`$query = "DELETE FROM users WHERE id = " . $_GET["id"] ;`}/>
                <p>Then, The Hacker Can sets <span className="highlighted">id</span> as :</p>
                <CodeBlock language={"sql"} code={"0 OR 1=1"}/>
                <p>And That will Runs:</p>
                <CodeBlock language={"sql"} code={`DELETE FROM users WHERE id = 0 OR 1=1;`}/>
                <p>Boom!, The entire <span className="highlighted">users</span> table is deleted!</p>
            </div>
          </ArticlePart>
          <ArticlePart className="fix-prevent">
            <h4>5. How to Fix & Secure Your Website ?</h4>
            <div>
              <p>
                <b style={{fontSize: "1.3em", display: "block"}}>1. Use Parameterized Queries. </b>
                Instead of Doing This : 
              </p>
              <CodeBlock language={"php"} code={`$query = "SELECT * FROM users WHERE username = '$user' AND password = '$pass'";`}/>
              <p>Do This with prepared statements: : </p>
              <CodeBlock language={"php"} code={`$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");\n\n$stmt->execute([$user, $pass]);`}/>
              <p>
                - That's Will Make The SQL and user input stay separate!.
                <br />
                - Even if The Hacker inputs SQL code, it won't execute!
                </p>
              <br />
              <p>
                <b style={{fontSize: "1.3em", display: "block"}}>2. Escape User Input (In case, You Can't Use Prepared Statements) </b>
                - Do this : 
              </p>
              <CodeBlock language={"php"} code={`$user = mysqli_real_escape_string($conn, $_GET['user']);\n\n$query = "SELECT * FROM users WHERE username = '$user'";`}/> 
              <p># This <b>prevents special characters</b> from breaking the query.</p>
              <br />
              <p>
                <b style={{fontSize: "1.3em", display: "block"}}>3. Limit The Database User Privileges. </b>
                <br />
                That's For <b>In Case Even if SQLi happens, To restrict The damage.</b>
                <br />
                <b>The database user should NOT have </b>
                <span className="highlighted">DROP</span>, 
                <span className="highlighted">DELETE</span>, or 
                <span className="highlighted">UPDATE</span> permissions.
                <br />
                <b># Use read-only accounts where possible.</b>
              </p>
              <br />
              <p>
                <b style={{fontSize: "1.3em", display: "block"}}>4. Hide Error Messages. </b>
                <br />
                Every Hacker love error messages because they reveal database details, <b>Disable them</b>!:
                <br />
                In Your <span className="highlighted">.php</span> file Write These Two Lines in your specific File :
                </p>
                <CodeBlock language={"php"} code={`ini_set('display_errors', 0);\n\nerror_reporting(0);`}/>
                <p>
                  But If you want hidding the Error Message To be Globally (for the whole website) do this Inside
                  <span className="highlighted">php.ini</span> File :
                </p>
                <CodeBlock language={"ini"} code={`display_errors = Off\n\nerror_reporting = 0`}/>
                <p>
                  If you're Using Php and Apache Web Server Then You can put this Line Inisde
                  <span className="highlighted">.htaccess</span> File : 
                </p>
                <CodeBlock language={"apache"} code={"php_flag display_errors off"}/>
                <hr />
                <p>
                  <b>Why Hide Errors?</b>
                  <br />
                  <i>To Avoid Expose Things Like These : </i>
                </p>
                  <ul>
                    <li>File paths - helpful for LFI attacks</li>
                    <li>SQL errors - useful for SQL Injection.</li>
                    <li>Sensitive configurations - like database details.</li>
                  </ul>
            </div>
          </ArticlePart>
          <ArticlePart className="conclusion-resources">
          <h4>- The Conclusion & Additional Resources</h4>
          <div>
            <p>
              <b>SQL Injection is one of the most dangerous vulnerabilities</b>, allowing attackers to steal data, modify records, and take control of a website.
              <br />
              <br />
              <b>Always use prepared statements, escape input, and restrict database permissions to stay safe!</b>
              <br/>
            </p>
            <br/>
            <h3>Additional Resources</h3>
            <br/>
            <ul>
              <li>
                <b>
                  <a href="https://portswigger.net/web-security/all-labs#sql-injection" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >Portswigger - Sql Injection Labs</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://owasp.org/www-community/attacks/SQL_Injection" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >OWASP - Sql Injection Guide</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://portswigger.net/web-security/sql-injection/cheat-sheet" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >PortSwigger - SQL injection cheat sheet</a>
                  </b>
              </li>
              <li>
                <b>
                  <a href="https://www.google.com/search?q=bug+bounty+reports+on+sql+injection+intitle+medium" 
                    target="_blank"
                    style={{color: "#2626f8",textDecoration: "underline"}}
                    >Bug Bounty Reports</a>
                  </b>
              </li>
            </ul>
          </div>
          </ArticlePart>
          <ArticlePart className="good-bye">
          <h4>🟡 Last but not Least!</h4>
          <div>
            <p style={{fontWeight: "bold"}}>"Think like an attacker, defend like a guardian! The best security expert is the one who never stops learning! "</p>
            <br/>
            <p style={{color: "var(--main-color)", fontFamily: 'heading-font',fontWeight: "bold"}}>
              <a href="https://facebook.com/fandeta7"
              target="_blank"
              style={{color: "var(--main-color)", textDecoration: "underline"}}>Fandeta</a> was here!</p>
          </div>
          </ArticlePart>
        </article>
        <Footer/>
      </>
  )
}

