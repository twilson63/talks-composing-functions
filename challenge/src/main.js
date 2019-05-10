import start from './log2html.js'
try {
  start()
  console.log('Welcome to my playground :)')
  console.log('')
  
  /** start coding here **/
  const url = 'https://r3.smarthealthit.org/Patient/smart-1557780/$everything?_count=1000&_format=json'

  console.log(url)

  async function run() {
    const bundle = await fetch(url).then(res => res.json())
    const entries = prop('entry')(bundle)
    const resources = pluck('resource')(entries) 
    const medicationRequests = filter(
      propEq('resourceType', 'MedicationRequest')
    )(resources)   
    //TODO
    // also filter for active
    const concepts = pluck('medicationCodeableConcept')(medicationRequests)
    const codings = pluck('coding')(concepts)
    
    const rxnorms = map(
      find(propEq('system', 'http://www.nlm.nih.gov/research/umls/rxnorm'))
    )(codings)
    const results = map(only(['code', 'display']))(rxnorms)
    console.log(results)
    
    
  }

  run()
  
  // pure functions
  function compose(...args) {
    return function (x) {
      return args.reduceRight((acc, f) => {
        return f(acc)
      }, x)
    }
  }

  function only(keys) {
    return function (obj) {
    return keys.reduce((acc, v) => {
      acc[v] = obj[v]
      return acc
    }, {})
    }
  }

  function prop(key) {
    return function (obj) {
      return obj[key]
    }
  }

  function map(fn) {
    return function (array) {
      return array.map(fn)
    }
  }
  
  
  function pluck(key) {
    return function (array) {
     return map(prop(key))(array)
    }
  }
  

  function propEq(key, value) { 
    return function (obj) {
      return obj[key] === value
    }
  }
    
  function find(fn) {
    return function (array) {
      return array.find(fn)
    }
  }

  function filter(fn) { 
    return function (array) {
      return array.filter(fn)
    }
  }

  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /** end coding here **/












} catch (err) {
  console.log('***** Error *****') 
  console.log('Message: ' + err.message)
  console.log('***** Error *****')
  throw err
}


