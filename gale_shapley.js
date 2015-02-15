var assert = require('assert');
var _ = require('lodash');
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
    if(!proposers[i].engagedTo && proposers[i].preferenceQueue.length > 0){
      return proposers[i]
    }
  }
  return
}

function propose(acceptor, proposer){
  // If not engaged or prefer proposer over currently engaged
  if(!acceptor.engagedTo || acceptor.preferences[proposer.id] < acceptor.preferences[acceptor.engagedTo.id]){
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
    current = getFree(proposers);
  }
}

function getPrint(persons){
  var result = [];
  _.each(persons, function(value){
    result.push({
      id: value.id,
      engagedTo: value.engagedTo.id
    })
  })

  return result;
}

describe("gale shapley stable matching", function(){
  it("should result in a stable matching", function(){
    var proposers = [
      {
        id: 1,
        engagedTo: null,
        preferenceQueue: [4, 3]
      },
      {
        id: 2,
        engagedTo: null,
        preferenceQueue: [4, 3]
      }
    ];
    var acceptors = {
      3: {
        id: 3,
        engagedTo: null,
        preferences: {
          1: 1,
          2: 2
        }
      },
      4: {
        id: 4,
        engagedTo: null,
        preferences: {
          1: 1,
          2: 2
        }
      }
    };

    stableMatch(proposers, acceptors);
    var testProp = getPrint(proposers);
    var testAccept = getPrint(acceptors);
    // console.log(testProp, testAccept);
    assert.equal(JSON.stringify(testProp) == JSON.stringify([ { id: 1, engagedTo: 3 }, { id: 2, engagedTo: 4 } ]), true);
    assert.equal(JSON.stringify(testAccept) == JSON.stringify([ { id: 3, engagedTo: 1 }, { id: 4, engagedTo: 2 } ]), true);
  })
})
