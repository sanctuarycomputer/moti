import React, { Component } from 'react';
import Radium from 'radium';
import CoreStyles from '../../lib/styles';

const {
  linkStyle
} = CoreStyles;

@Radium
export default class Legal extends Component {
  render() {
    return (
      <p>
        PRIVACY STATEMENT<br/>
        ----<br />
        SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?<br/>
        We simply need your information in order to run our website and for you to have the best experience on the site. We will not use your data for any other reason than this.<br/><br/>
        SECTION 2 - CONSENT<br/>
        How do you get my consent? When you provide us with your information you consent to using our website.<br/>
        How do I withdraw my consent? If you opt out, you can simply sign out of the website.<br/><br/>
        SECTION 6 - SECURITY<br/>
        To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not misused.<br/><br/>
        SECTION 7 - AGE OF CONSENT<br/>
        By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.<br/><br/>
        SECTION 8 - CHANGES TO THIS PRIVACY POLICY<br/>
        We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.<br/><br/>
        QUESTIONS AND CONTACT INFORMATION<br/>
        If you would like to register a complaint, or simply want more information contact our Privacy Compliance Officer at <a style={[linkStyle]} href="mailto:museumoftheinternet@gmail.com">museumoftheinternet@gmail.com</a>.
      </p>
    );
  }
}