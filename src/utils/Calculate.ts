import { Model } from "../model.type";

type Res = { formula: string; res: number };

export enum TransactionResults {
  DROP = "Выпадение",
  SUCCESSFUL = "Выдача без ошибок",
  REPEAT = "Стирание и повтор",
}

export class Calculate {
  // Pпп =(1+ Pош 1)m – вероятность правильного решения в ПК(прямом канале)
  public successProbInDirectCh: Res;

  // вероятность обнаружения ошибки в ПК
  public errorDetectionProbDirectCh: Res;

  // вероятность не обнаружения ошибки в ПК
  public errorNotDetectionProbDirectCh: Res;

  // вероятность выдачи сообщения с ошибкой при отсутствии ошибки в обратном канале
  public msgWithError: Res;

  // допустимое значение вероятности неправильного приема сигнала обратной связи
  public acceptableValProbIncorrectReceptReversedCh: Res;
  // минимальное допустимое значение неправильного приема сигнала
  public minAcceptableValProbIncorrectRecept: Res;

  constructor(private model: Model) {
    this.successProbInDirectCh = this.calcSuccessProbInDirectCh();
    this.errorDetectionProbDirectCh = this.calcErrorDetectionProbDirectCh();
    this.errorNotDetectionProbDirectCh =
      this.calcErrorNotDetectionProbDirectCh();

    this.msgWithError = this.calcMsgWithError();
    this.acceptableValProbIncorrectReceptReversedCh =
      this.calcAcceptableValProbIncorrectReceptReversedCh();

    this.minAcceptableValProbIncorrectRecept =
      this.calcMinAcceptableValProbIncorrectRecept();
  }

  private calcSuccessProbInDirectCh() {
    return {
      formula: `(1 - ${this.model.directChannel})^${this.model.digitsNumber}`,
      res: (1 - this.model.directChannel) ** this.model.digitsNumber,
    };
  }

  private calcErrorDetectionProbDirectCh() {
    const c: Res[] = [];
    let res = 0;
    let formula = "";

    for (let i = 1; i < this.model.codeDistance; i++) {
      c.push({
        formula: `(${this.model.digitsNumber}! /
        (${i}! * (${this.model.digitsNumber} - ${i})!))`,
        res:
          factorialize(this.model.digitsNumber) /
          (factorialize(i) * factorialize(this.model.digitsNumber - i)),
      });

      console.log(c);

      res +=
        c[i - 1].res *
        this.model.directChannel ** i *
        (1 - this.model.directChannel ** i) ** (this.model.digitsNumber - i);

      formula += `${c[i - 1].res} *
      ${this.model.directChannel}^${i} *
      (1 - ${this.model.directChannel ** i})^${this.model.digitsNumber - i} + `;
    }

    return { res, formula };
  }

  private calcErrorNotDetectionProbDirectCh(): Res {
    return {
      formula: `1 - ${this.successProbInDirectCh.res.toFixed(
        3
      )} - ${this.errorDetectionProbDirectCh.res.toFixed(3)}`,
      res: Math.abs(
        1 - this.successProbInDirectCh.res - this.errorDetectionProbDirectCh.res
      ),
    };
  }

  private calcMsgWithError(): Res {
    return {
      res:
        this.errorNotDetectionProbDirectCh.res /
        (1 - this.errorDetectionProbDirectCh.res),
      formula: `${this.errorNotDetectionProbDirectCh.res.toFixed(
        3
      )} / (1 - ${this.errorDetectionProbDirectCh.res.toFixed(3)})`,
    };
  }

  private calcAcceptableValProbIncorrectReceptReversedCh(): Res {
    return {
      res:
        (this.model.ratio *
          this.msgWithError.res *
          (1 - this.errorDetectionProbDirectCh.res)) /
        (1 -
          2 *
            this.model.ratio *
            this.msgWithError.res *
            this.errorDetectionProbDirectCh.res),
      formula: `(${this.model.ratio} *
        ${this.msgWithError.res.toFixed(3)} *
        (1 - ${this.errorDetectionProbDirectCh.res.toFixed(3)})) /
      (1 -
        2 *
          ${this.model.ratio} *
          ${this.msgWithError.res.toFixed(3)} *
          ${this.errorDetectionProbDirectCh.res.toFixed(3)})`,
    };
  }

  private calcMinAcceptableValProbIncorrectRecept() {
    let res = 0;
    let formula = "";

    for (
      let i = (this.model.codeDistance + 1) / 2;
      i <= this.model.codeDistance;
      i++
    ) {
      res +=
        (factorialize(this.model.codeDistance) /
          (factorialize(i) * factorialize(this.model.codeDistance - i))) *
        this.model.reversedChannel ** i *
        (1 - this.model.reversedChannel ** i) ** (this.model.codeDistance - i);
      formula += `
      (${this.model.codeDistance}! /
      (${i}! * (${this.model.codeDistance} - ${i})!)) *
    ${this.model.reversedChannel}^${i} *
    (1 - ${this.model.reversedChannel}^${i})^(${this.model.codeDistance} - ${i})
          `;
    }

    return {
      res,
      formula,
    };
  }

  public modeling(msgsCount: number) {
    const res = {
      success: 0,
      repeat: 0,
      drop: 0,
    };

    let i = 0;
    while (i < msgsCount) {
      if (Math.random() <= this.successProbInDirectCh.res) {
        res.success++;
        i++;
        continue;
      }

      if (Math.random() <= this.errorDetectionProbDirectCh.res) {
        res.repeat++;
        i++;
        continue;
      }

      if (
        Math.random() <= this.successProbInDirectCh.res &&
        Math.random() <= this.msgWithError.res
      ) {
        res.drop++;
        i++;
        continue;
      }

      res.repeat++;
      i++;
    }

    return res;
  }
}

function factorialize(num: number): number {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * factorialize(num - 1);
  }
}
