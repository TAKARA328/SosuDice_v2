/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* version */

const Alexa = require('ask-sdk-core');
const util = require('util');

const skillName = '素数サイコロ';

var DiceArray  = [2,2,2,3,3,5,7,9,11,13];

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = '素数サイコロです。サイコロを振りますか？';
//    console.log(`===> LaunchRequestHandler::userId: ${util.inspect(handlerInput.requestEnvelope.session.user.userId)}`);
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, speechText)
      .getResponse();
  },
};

const TakeTheDiceIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && (handlerInput.requestEnvelope.request.intent.name === 'TakeTheDiceIntent'
    || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent');
  },
  handle(handlerInput) {
    const speechText = 'です。サイコロを振りますか？';
    const nextSpeechText = 'サイコロを振りますか？';

    let diceindex = Math.floor( Math.random() * (DiceArray.length) );
    console.log(`TakeTheDiceIntentHandler::Random ${diceindex}  ::Value ${DiceArray[diceindex]}`);

    return handlerInput.responseBuilder
      .speak(DiceArray[diceindex] + speechText)
      .reprompt(nextSpeechText)
      .withSimpleCard(skillName, DiceArray[diceindex] + 'です。')
      .getResponse();
  },
};

const WaitaminuteIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && (handlerInput.requestEnvelope.request.intent.name === 'WaitaminuteIntent'
    || handlerInput.requestEnvelope.request.intent.name === 'CatchAllIntent');
  },
  handle(handlerInput) {
    const speechText = '３秒待ちます。<break time="3s" />サイコロを振りますか？';
    const nextSpeechText = 'サイコロを振りますか？';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(nextSpeechText)
//      .withSimpleCard(skillName, speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = '素数サイコロは、２、３、５、７、１１、１３の、６個の素数を使った、不思議なサイコロです。サイコロをふって、の合図で、ランダムに数字を選択します。では、サイコロを振りますか？';
    const helpText = '素数サイコロは、２、３、５、７、１１、１３の素数を使用した不思議なサイコロです。サイコロを振って！の合図でランダムに数字を選択します。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, helpText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'OwariIntent');
    },
  handle(handlerInput) {
    const speechText = '素数サイコロでした。ごきげんよう。';

    return handlerInput.responseBuilder
      .speak(speechText)
//      .withSimpleCard(skillName, speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    TakeTheDiceIntentHandler,
    WaitaminuteIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
