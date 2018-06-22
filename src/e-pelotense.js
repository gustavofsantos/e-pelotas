const sha256 = require('crypto-js/hmac-sha256');
const IPFS = require('ipfs');
const solc = require('solc');


function Pelotense(attributes, web3) {
  // const personIdentityHash;
  // const contractAddress;
  const ePelotenseContractCodeIPFS = 'QmPWsvuPJ975uSmMjFjJ3VLaDnGsgPH8JJBhQA1DubtLVh';
  let isDeployed = false;

  function deployAttributes(done, error) {
    const ipfs = new IPFS({ repo: 'instance.data' });
    ipfs.on('ready', () => {
      ipfs.object.put(
        new Buffer(JSON.stringify(attributes)), 
        (err, node) => {
          if (err) error(err);
          done(node.toJSON());
        }
      );
    });

    ipfs.on('error', err => error(err));
  }

  function deployContract(deployerAddress, hashAttributes, done, error) {
    /**
     * 
     */
    function getEPelotenseContractCode(done, error) {
      const ipfs = new IPFS({ repo: 'instance.data' });
      ipfs.on('ready', () => {
        ipfs.files.get(
          ePelotenseContractCodeIPFS, 
          (err, files) => {
            if (err) error(err);
            done(files[0].file.content.toString('utf-8'));
          }
        );
      });

      ipfs.on('error', err => error(err));
    }

    function compileContract(source) {
      return solc.compile(source, 1).contracts[':Pelotense'];
    }

    getEPelotenseContractCode(source => {
      const { interf, bytecode } = compileContract(source);
      async function deploy() {
        const res = await new web3.eth.Contract(JSON.parse(interf), hashAttributes)
          .deploy({ data: bytecode })
          .send({
            gas: 700000,
            from: deployerAddress
          });
        done(res.options);
      }
    }, err => {
      console.log('error');
    });
  }


  return {
    deploy: (fromAddress, done, error) => {
      if (!isDeployed) {
        deployAttributes(node => {
          console.log('node: ', node);
          deployContract(fromAddress, node.multihash, done, error);
        }, error => {
          console.log(error);
        });
      }
      error("Is deployed.");
    },
    toJSON: () => {
      
    },
    toString: () => {

    }
  }
}

module.exports = Pelotense;