export default function Validation(userData) {
  let regexTitle = /^[a-zA-Z0-9\s]{1,50}$/;
  let regexHealthScore = /^([1-9][0-9]?|100)$/;

  let errores = {};

  if (userData.title) {
    if (!regexTitle.test(userData.title))
      errores.title =
        "debe contener de 5-20 caracteres y no debe contener simbolos";
  }

  if (userData.summary) {
    if (!userData.summary.length) errores.summary = "Debe tener un summary";
  }

  if (userData.healthScore) {
    if (!regexHealthScore.test(userData.healthScore))
      errores.healthScore = "Debe ser distinto a 0";
  }

  if (userData.stepByStep) {
    if (!userData.stepByStep.length)
      errores.stepByStep = "Debe tener un setByStep";
  }

  return errores;
}
