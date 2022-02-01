/* eslint-disable object-shorthand */
import { CryptoCurve } from "../types/cryptoCurve";
import { QuestionTree } from "../types/questions";
import { getYesNoValidator, integerValidator } from "./common";
import * as commonQs from "./commonQs";

const _outputUserInputs: QuestionTree = commonQs.outputUserInputs;
_outputUserInputs.transformerValidator = getYesNoValidator(_outputUserInputs, undefined, "y");

const _tesseraQuestion: QuestionTree = commonQs.tesseraQuestion;
_tesseraQuestion.transformerValidator = getYesNoValidator(_tesseraQuestion, _outputUserInputs, "y");

const _permissionQuestion: QuestionTree = commonQs.permissionQuestion;
_permissionQuestion.transformerValidator = getYesNoValidator(_permissionQuestion, _tesseraQuestion, "y");

const _staticNodesQuestion: QuestionTree = commonQs.staticNodesQuestion;
_staticNodesQuestion.transformerValidator = getYesNoValidator(_staticNodesQuestion, _permissionQuestion, "y");

const _curveQuestion: QuestionTree = commonQs.curveQuestion;
_curveQuestion.options = [
  { label: "secp256k1", value: CryptoCurve.k1, nextQuestion: _staticNodesQuestion, default: true },
  { label: "secp256r1", value: CryptoCurve.r1, nextQuestion: _staticNodesQuestion }
];

const _bootnodesQuestion: QuestionTree = commonQs.bootnodesQuestion;
_bootnodesQuestion.transformerValidator = integerValidator(_bootnodesQuestion, _curveQuestion, 2);

const _membersQuestion: QuestionTree = commonQs.membersQuestion;
_membersQuestion.transformerValidator = integerValidator(_membersQuestion, _bootnodesQuestion, 1);

const _validatorsQuestion: QuestionTree = commonQs.validatorsQuestion;
_validatorsQuestion.transformerValidator = integerValidator(_validatorsQuestion, _membersQuestion, 4);

const _txnSizeLimitQuestion: QuestionTree = commonQs.txnSizeLimitQuestion;
_txnSizeLimitQuestion.transformerValidator = integerValidator(_txnSizeLimitQuestion, _validatorsQuestion);

const _maxCodeSizeQuestion: QuestionTree = commonQs.maxCodeSizeQuestion;
_maxCodeSizeQuestion.transformerValidator = integerValidator(_maxCodeSizeQuestion, _txnSizeLimitQuestion);

const _coinbaseQuestion: QuestionTree = commonQs.coinbaseQuestion;
_coinbaseQuestion.transformerValidator = integerValidator(_coinbaseQuestion, _maxCodeSizeQuestion);

const _gasLimitQuestion: QuestionTree = commonQs.gasLimitQuestion;
_gasLimitQuestion.transformerValidator = integerValidator(_gasLimitQuestion, _coinbaseQuestion);

const _difficultyQuestion: QuestionTree = commonQs.difficultyQuestion;
_difficultyQuestion.transformerValidator = integerValidator(_difficultyQuestion, _gasLimitQuestion, 1);

export const _chainIDQuestion: QuestionTree = commonQs.chainIDQuestion;
_chainIDQuestion.transformerValidator = integerValidator(_chainIDQuestion, _difficultyQuestion);
