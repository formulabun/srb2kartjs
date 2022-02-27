import {expect} from 'chai';
import Canvas from 'canvas';

import {Pk3, Wad} from '../file.js';

describe("file.js", function() {
  const srb2pk3 = "./test/wads/srb2.pk3";
  describe("pk3file", function() {
    const ctap = "./test/pk3s/kr_CTAP-v5.3.pk3";
    const ip = "./test/pk3s/KRB_IP-v2.1.pk3";
    describe("#getAllSocs", function() {
      it("works", function(done) {
        const pk3file = new Pk3(ctap);
        pk3file.loadData().then(() => pk3file.getAllSocs().then((socs) => {
          expect(socs.level.gt).to.be.ok; 
          expect(socs.level.gw).to.be.ok; 
          expect(socs.level.gy).to.be.ok; 
          done();
        })).catch(done)
      });
    });

    describe("#getImage", function() {
      const ctapfile = new Pk3(ctap);
      const ipfile = new Pk3(ip);
      it("works with default palette", function(done) {
        ipfile.loadData().then( () =>
          ipfile.setBaseFile(srb2pk3)
        ).then( () => 
          ipfile.getImage("Graphics/MAPS0P")
        ).then((image) => {
          expect(image).to.be.ok;
          expect(image).to.be.instanceof(Canvas.Canvas);
          done();
        }).catch(done);
      });

      it("works with custom palette in map pack", function(done) {
        ctapfile.loadData().then(() => ctapfile.getImage("Graphics/MAPGQP.lmp")).then((image) => {
          expect(image).to.be.ok;
          expect(image).to.be.instanceof(Canvas.Canvas);
          done();
        }).catch(done);
      });
    });
  });

  describe("wadfile", function() {
    const srb2pk3file = new Wad(srb2pk3);
    describe("#getBuffer", function() {
    });

    describe("#getText", function() {
      it("works", function(done) {
        srb2pk3file.getText("ANIMDEFS").then(([file]) => {
          expect(file).to.be.ok;
          expect(file.split("\n")[0].trim()).to.equal("// ANIMDEFS lump generated by SLADE3");
          done();
        }).catch(done);
      });
    })
  });
});
