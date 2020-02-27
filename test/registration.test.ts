
import {expect} from 'chai';

function hello(){
    return 'Hello World!'
}

describe('Sample test', ()=>{
    it('should return hello world', () => {
        const result = ()=>{
            return 'Hello World'
        }
        expect(result).to.equal('Hello World!')

    });
})
