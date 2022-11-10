const MoodContractAddress = "0x2e9a45acdcaeba86ad1bb2b2882df35a024e1e27";
  const MoodContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



  let MoodContract;
  let signer;
  const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
      );
    });
  });

  async function getMood() {
    const getMoodPromise = MoodContract.getMood();
    const Mood = await getMoodPromise;
    console.log(Mood);
  }
  
  async function setMood() {
    const mood = document.getElementById("mood").value;
    const setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
  }

  