var assert = require('assert');

/*
Proposers
array of Proposers
where preferenceQueue is an array of their preferred matches in reverse order of preference.
[
  {
    id: "1",
    engagedTo: null,
    preferenceQueue: [
      "23",
      "25"
    ]
  }
]
*/
/*
Acceptors
object of Acceptors
where preferences is an array of their preferred matches in reverse order of preference.
{
  "1": {
    id: "1",
    engagedTo: null,
    preferences: {
      "25": 1,
      "23": 2
    }
  }
}
*/

function getFree(proposers){
  for(var i=0;i<proposers.length;i++){
    if(!proposers[i].engagedTo && proposers[i].preferences.length > 0){
      return proposers[i]
    }
  }
  return
}

function propose(acceptor, proposer){
  // If not engaged or prefer proposer over currently engaged
  if(!proposers[i].engaged || acceptor.preferences[proposer.id] > acceptor.preferences[acceptor.engagedTo.id]){
    acceptor.engagedTo = null;
    acceptor.engagedTo = proposer;
    proposer.engagedTo = acceptor;
  }
}

function stableMatch(proposers, acceptors){
  var current = getFree(proposers);
  while(current){
    var currentProposal = current.preferenceQueue.pop();
    propose(acceptors[currentProposal], current);
  }

}


describe("test", function(){
  it("test1", function(){
    assert.equal(2, 1)
  })
})
