export interface GospelCard {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  symbol: string;
  scripture: string;
  href: string;
  reveal: {
    what: string;
    why: string;
    love: string;
  };
}

export const gospelCards: GospelCard[] = [
  {
    id: "the-incarnation",
    number: 1,
    title: "The Incarnation",
    subtitle: "God became human — and that changes everything",
    symbol: "✨",
    scripture: "John 1:14",
    href: "/studies/gospel/jesus-at-the-centre",
    reveal: {
      what: "The eternal Word — through whom all things were made — took on human flesh and lived among us. Not as an appearance. Not as a vision. He was born, grew up, got tired, wept, and died. The Creator entered his own creation.",
      why: "The incarnation is not a side story. It is the hinge of all history. Everything God wanted to say about himself, he said in a person. Jesus is not just the message — he is the messenger and the message at once. 'Whoever has seen me has seen the Father' (John 14:9).",
      love: "God did not send a memo. He came himself. The incarnation is the most extreme act of love in the universe — the infinite becoming finite, the immortal becoming mortal, so that we would never have to wonder what God is like.",
    },
  },
  {
    id: "the-cross",
    number: 2,
    title: "The Cross",
    subtitle: "The one place where justice and mercy meet",
    symbol: "✝",
    scripture: "Romans 5:8",
    href: "/studies/gospel/righteousness-by-faith",
    reveal: {
      what: "Jesus was crucified under Pontius Pilate around 31 AD — a historical event in Roman-occupied Judea. But the cross is not only a historical event. It is the moment the sin of humanity was laid on the sinless Son of God, who bore the full consequence of it so we would not have to (2 Cor 5:21).",
      why: "The cross answers the deepest question in the universe: how can a holy God forgive guilty people without pretending justice does not matter? The answer is not that God overlooked sin. It is that God absorbed it — in Christ. Justice was satisfied. Mercy was given. Both at once.",
      love: "'God demonstrates his own love for us in this: while we were still sinners, Christ died for us' (Rom 5:8). Not when we had cleaned up. Not when we had earned it. While we were still the problem, he became the solution. That is the cross.",
    },
  },
  {
    id: "righteousness-by-faith",
    number: 3,
    title: "Righteousness by Faith",
    subtitle: "You are declared right — not because of what you did, but because of what he did",
    symbol: "⚖️",
    scripture: "Romans 3:22",
    href: "/studies/gospel/righteousness-by-faith",
    reveal: {
      what: "Righteousness by faith means God counts Christ's perfect record as yours — not because you earned it, but because you trusted the one who did. This was the hinge doctrine of the Protestant Reformation. Luther called it the article by which the church stands or falls.",
      why: "The alternative is earning your standing before God — which is impossible. No one has a perfect record. But Christ does. Faith is not what earns righteousness; faith is how you receive what Christ already earned. The distinction matters: it means your standing before God rests on something that cannot change.",
      love: "Love gives what justice demands — so the person it loves does not have to pay it. That is exactly what happened at the cross. Christ took the debt. We receive the credit. Not because God lowered the standard, but because love met it on our behalf.",
    },
  },
  {
    id: "the-resurrection",
    number: 4,
    title: "The Resurrection",
    subtitle: "Death did not get the last word",
    symbol: "🌅",
    scripture: "1 Corinthians 15:20",
    href: "/studies/gospel/the-resurrection",
    reveal: {
      what: "Three days after the crucifixion, the tomb was empty. Over 500 people saw Jesus alive after his resurrection (1 Cor 15:6). The disciples — who had hidden in fear — became people willing to die for this claim. The resurrection is not a metaphor. It is the most attested event in the ancient world.",
      why: "If the cross is what God did for us, the resurrection is the verdict. It is God declaring: the sacrifice was accepted. Death was conquered. Christ is who he claimed to be. Without the resurrection, the cross is a tragedy. With it, the cross is a triumph.",
      love: "'Christ has been raised from the dead, the firstfruits of those who have fallen asleep' (1 Cor 15:20). The word 'firstfruits' means he is first, not last. Everyone connected to him follows. The resurrection is not just his — it is the guarantee of ours. Love that is stronger than death is the only love worth trusting with your life.",
    },
  },
  {
    id: "grace",
    number: 5,
    title: "Grace",
    subtitle: "The gift that does not depend on you",
    symbol: "🎁",
    scripture: "Ephesians 2:8–9",
    href: "/studies/gospel/righteousness-by-faith",
    reveal: {
      what: "'For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast' (Eph 2:8–9). Grace means unearned, undeserved, unconditional favour. It is not a reward. It is a gift.",
      why: "Grace is scandalous because it does not play by the rules we expect. We expect that good things go to good people. Grace says the best thing — salvation — goes to anyone who will receive it, regardless of what they have done. This is why it offends people. And why it changes people.",
      love: "Grace is not God lowering his standards. It is God meeting them himself so that we do not have to. Every breath you have taken since you sinned has been sustained by grace. It was already flowing before you thought to ask. That is love that does not wait to be invited.",
    },
  },
  {
    id: "the-holy-spirit",
    number: 6,
    title: "The Holy Spirit",
    subtitle: "God with you — not just God for you",
    symbol: "🕊",
    scripture: "John 14:16–17",
    href: "/studies/gospel/jesus-at-the-centre",
    reveal: {
      what: "Jesus promised that when he returned to the Father, he would send another Advocate — the Holy Spirit — to be with his people forever (John 14:16). The Spirit is not a force or a feeling. He is a person — the third person of the Godhead — who lives within those who trust Christ (1 Cor 6:19).",
      why: "The Holy Spirit is what makes the Gospel personal. Christ died for the world. The Spirit applies that death to you — convicting you of sin, drawing you to Christ, producing his character in you over time. Without the Spirit, salvation would be a legal transaction. With the Spirit, it is a relationship.",
      love: "'I will ask the Father, and he will give you another Advocate to help you and be with you forever' (John 14:16). Jesus did not just save us and leave. He sent someone to stay. The Spirit is God's presence in the mess of your daily life — love that does not only come through in the big moments.",
    },
  },
  {
    id: "adoption",
    number: 7,
    title: "Adoption",
    subtitle: "You are not a servant. You are a child.",
    symbol: "👑",
    scripture: "Romans 8:15",
    href: "/studies/gospel/love-for-god",
    reveal: {
      what: "'The Spirit you received does not make you slaves, so that you live in fear again; rather, the Spirit you received brought about your adoption to sonship. And by him we cry, Abba, Father' (Rom 8:15). Abba is not a formal title. It is what a child calls a dad they are not afraid of.",
      why: "Adoption means you did not earn your place in the family — you were chosen into it. Your standing does not depend on your performance. A child who messes up is still a child. You relate to God not as a judge assessing your work but as a Father who delights in you — not because of what you do, but because of whose you are.",
      love: "'See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!' (1 John 3:1). The word 'lavished' is not an accident. This is not love measured out carefully. It is extravagant, excessive, deliberate love — the kind a Father gives a child he chose.",
    },
  },
  {
    id: "new-creation",
    number: 8,
    title: "New Creation",
    subtitle: "The Gospel is not just forgiveness — it is transformation",
    symbol: "🌱",
    scripture: "2 Corinthians 5:17",
    href: "/studies/gospel/jesus-at-the-centre",
    reveal: {
      what: "'If anyone is in Christ, the new creation has come: the old has gone, the new is here!' (2 Cor 5:17). The Gospel does not just cover over who you were — it begins the process of making you into someone new. Salvation is not a patch on a broken life; it is the beginning of a rebuilt one.",
      why: "The new creation language connects the Gospel to Genesis. God who said 'let there be light' over the darkness of the world now says the same over the darkness in a life. The same creative power that made the universe is at work in the person who trusts Christ. This is not self-improvement. This is resurrection applied to daily life.",
      love: "God did not rescue you to leave you where he found you. The entire trajectory of the Gospel — from cross to resurrection to Spirit to adoption to new creation — is love moving you forward. You are not a project to be managed. You are a new creation being finished.",
    },
  },
];
