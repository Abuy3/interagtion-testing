const sinon = require('sinon');
const { expect } = require('chai');
const Service = require('../src/service');
const Repository = require('../src/repository');
const SecondaryRepository = require('../src/secondaryRepository');

describe('Service Integration Tests with multiple stubs', () => {
    let service;
    let primaryRepoStub;
    let secondaryRepoStub;

    beforeEach(() => {
        primaryRepoStub = sinon.createStubInstance(Repository);
        secondaryRepoStub = sinon.createStubInstance(SecondaryRepository);
        service = new Service();
        service.primaryRepository = primaryRepoStub; 
        service.secondaryRepository = secondaryRepoStub; 
    });

    it('should return an item from the primary repository', () => {
        const item = { id: 1, name: 'item 1' };
        primaryRepoStub.getItemById.withArgs(1).returns(item); 
        const result = service.getItemById(1);
        expect(result).to.equal(item);
        expect(primaryRepoStub.getItemById.calledOnceWith(1)).to.be.true;
        expect(secondaryRepoStub.getItemById.notCalled).to.be.true; 
    });

    it('should return an item from the secondary repository when not found in primary', () => {
        const item = { id: 3, name: 'item 3' };
        primaryRepoStub.getItemById.withArgs(3).returns(null); 
        secondaryRepoStub.getItemById.withArgs(3).returns(item); 
        const result = service.getItemById(3);
        expect(result).to.equal(item);
        expect(primaryRepoStub.getItemById.calledOnceWith(3)).to.be.true;
        expect(secondaryRepoStub.getItemById.calledOnceWith(3)).to.be.true;
    });

    it('should throw an error when item is not found in both repositories', () => {
        primaryRepoStub.getItemById.returns(null); 
        secondaryRepoStub.getItemById.returns(null); 
        expect(() => service.getItemById(5)).to.throw('Item not found in both repositories');
        expect(primaryRepoStub.getItemById.calledOnceWith(5)).to.be.true;
        expect(secondaryRepoStub.getItemById.calledOnceWith(5)).to.be.true;
    });

    
    it('should remove an item from the primary repository', () => {
        const itemToRemove = { id: 1, name: 'item 1' };
        primaryRepoStub.removeItemById.withArgs(1).returns(itemToRemove);
        const result = service.removeItemById(1);
        expect(result).to.equal(itemToRemove);
        expect(primaryRepoStub.removeItemById.calledOnceWith(1)).to.be.true;
        expect(secondaryRepoStub.removeItemById.notCalled).to.be.true;
    });
});