$(function () {
  $('#release_wizard').smartWizard({
    selected: 0,
    theme: 'default',
    transitionEffect:'fade',
    showStepURLhash: false,
    contentCache: false,
    hiddenSteps: [2,3]
  });
});