#!/bin/sh

# Schema Setup

appwrite deploy collection --all --yes
appwrite storage createBucket --bucketId 'thumbnails' --name 'thumbnails' --fileSecurity 'true' --permissions 'read("any")' --permissions 'create("users")' --permissions 'update("team:admins")' --permissions 'delete("team:admins")'  --maximumFileSize '5242880' --allowedFileExtensions 'png' --allowedFileExtensions 'jpg' --allowedFileExtensions 'jpeg'

# Categories

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'uncategorized' --data '{"name":"Uncategorized","description":"Thoughts about anything and everything.","hidden":true}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'startups' --data '{"name":"Startups","description":"Tech startup coverage that breaks down the funding, growth, and long-term trajectory of companies across every stage and industry, including climate, crypto, fintech, SaaS, transportation, and consumer tech.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'svb-2023-crash' --data '{"name":"SVB 2023 crash","description":"In early March a run on Silicon Valley Bank led to its takeover by the Federal government. During the following weekend, the startup and venture capital industry around the world was in crisis, as SVB banked both companies and their backers. The American government announced before the week started that depositors would be whole, and liquid on Monday, March 13. The story is not over. SVB affiliates around the world are still being sorted out, other banks are under pressure, and a second crypto-friendly bank was also taken over by the government. TechScrunch is working to better understand how founders are impacted in the wake of the initial crisis, and what is ahead.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'venture' --data '{"name":"Venture","description":"Our venture capital coverage features all the VCs, the VC-backed startups, and the investment trends that founders, investors, students, corp development pros, academics - and anyone else interested in the way that tech is transforming the world - should be tracking.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'security' --data '{"name":"Security","description":"Cybersecurity encompasses investigative reporting and analysis on the latest security breaches, hacks and cyberattacks around the globe.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'robotics-ai' --data '{"name":"Robotics & AI","description":"Bleeding edge robotics companies and AI startups, focused on a wide range of automation categories, including logotics, ag-tech, delivery, healthcare, home robotics and food service, along with the latest university and laboratory research into soft robotics, nano robotics and more.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'cryptocurrency' --data '{"name":"Crypto","description":"Cryptocurrency coverage and news on Bitcoin, Ethereum and the blockchain startups building the future of crypto, web3 using tokens and NFTs.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'apps' --data '{"name":"Apps","description":"The app economy continues to grow, having produced a record number of downloads and consumer spending across both the iOS and Google Play stores. Keep up with this fast-moving industry in one place, with the latest from the world of apps, including news, updates, startup fundings, mergers and acquisitions, and much more.","hidden":false}'

appwrite databases createDocument --databaseId 'default' --collectionId 'categories' --documentId 'events' --data '{"name":"Events","description":"Be the first to hear about the latest TechScrunch events and opportunities.","hidden":false}'

# Thumbnails

appwrite storage createFile --bucketId 'thumbnails' --fileId 'how-to-improve-your-life' --file './images/how-to-improve-your-life.png'
appwrite storage createFile --bucketId 'thumbnails' --fileId 'the-power-of-positive-self-talk' --file './images/the-power-of-positive-self-talk.png'
appwrite storage createFile --bucketId 'thumbnails' --fileId 'the-rise-of-low-code-development' --file './images/the-rise-of-low-code-development.png'
appwrite storage createFile --bucketId 'thumbnails' --fileId 'the-surprising-benefits-of-solitude' --file './images/the-surprising-benefits-of-solitude.png'
appwrite storage createFile --bucketId 'thumbnails' --fileId 'why-delaying-tasks-can-be-productive' --file './images/why-delaying-tasks-can-be-productive.png'
appwrite storage createFile --bucketId 'thumbnails' --fileId 'why-you-should-learn-haskell' --file './images/why-you-should-learn-haskell.png'

# Authors

appwrite users create --userId 'chat-gpt' --email 'chatgpt@appwrite.io' --name 'Chat GPT'

# Author Pictures

appwrite storage createFile --bucketId 'thumbnails' --fileId 'chat-gpt' --file './images/chat-gpt-logo.png'

# Articles

appwrite databases createDocument --databaseId 'default' --collectionId 'articles' --documentId 'the-surprising-benefits-of-solitude' --data '{"authorId":"chat-gpt","authorName":"Chat GPT","authorImage":"chat-gpt","isPromoted":false,"isPinned":true,"title":"The Surprising Benefits of Solitude","categoryId":"uncategorized","imageId":"the-surprising-benefits-of-solitude","content":"In a world that is constantly connected through social media and digital communication, solitude is often viewed as a negative thing. Many people fear being alone and equate it with loneliness and isolation. However, the truth is that solitude can actually have many surprising benefits.\nFirst and foremost, solitude provides us with the opportunity to reflect and recharge. When we are constantly surrounded by others and bombarded with information, it can be difficult to find the time and space to process our thoughts and emotions. Solitude allows us to step back from the chaos of daily life and focus on ourselves. It gives us the chance to examine our thoughts and feelings without distractions, and to gain a deeper understanding of who we are and what we want in life.\nIn addition, solitude can also enhance creativity. When we are alone, we are free to explore our imaginations without fear of judgement or interruption. We can engage in activities that we may not have the opportunity to do when we are with others, such as writing, painting, or playing music. This can lead to breakthroughs in creative thinking and problem solving, as we are able to approach challenges from a fresh perspective.\nFurthermore, solitude can also improve our relationships with others. When we take the time to care for ourselves, we are better able to care for those around us. Solitude can help us to identify our needs and boundaries, which in turn can help us to communicate more effectively with others. By cultivating a sense of independence and self-awareness through solitude, we can become more confident and secure in our relationships.\nOf course, it is important to note that there is a difference between healthy solitude and isolation. While solitude can be beneficial, it is important to also maintain connections with others and engage in social activities. It is all about finding a balance that works for you.\nIn conclusion, solitude is often misunderstood and undervalued in today society. However, taking the time to be alone with ourselves can have numerous benefits for our mental and emotional wellbeing, our creativity, and our relationships with others. So, the next time you find yourself with some free time, consider embracing solitude and see what surprises it may bring."}'

appwrite databases createDocument --databaseId 'default' --collectionId 'articles' --documentId 'the-power-of-positive-self-talk' --data '{"authorId":"chat-gpt","authorName":"Chat GPT","authorImage":"chat-gpt","isPromoted":false,"isPinned":true,"title":"The Power of Positive Self-Talk","categoryId":"uncategorized","imageId":"the-power-of-positive-self-talk","content":"Self-talk refers to the inner voice or thoughts that we have about ourselves, our abilities, and our circumstances. It is a constant dialogue that we have with ourselves, and it can greatly influence our emotions, actions, and overall well-being. While negative self-talk can be damaging and lead to low self-esteem, anxiety, and depression, positive self-talk has the power to boost our confidence, improve our mood, and increase our resilience.\nPositive self-talk is more than just repeating affirmations or positive statements to oneself. It involves reframing negative thoughts into more positive and constructive ones. For example, instead of saying - I am not good enough - one can reframe it as - I am capable of achieving my goals. Positive self-talk also involves being kind and compassionate towards oneself, acknowledging one strengths and accomplishments, and focusing on solutions rather than problems.\nResearch has shown that positive self-talk can have a significant impact on our physical and mental health. It has been linked to lower levels of stress, better coping skills, and improved overall well-being. In fact, a study published in the Journal of Personality and Social Psychology found that people who engage in positive self-talk have better cardiovascular health and a stronger immune system than those who engage in negative self-talk.\nMoreover, positive self-talk can help us achieve our goals and overcome obstacles. By focusing on our strengths and capabilities, we can boost our confidence and motivation to take action towards our goals. Positive self-talk can also help us overcome self-doubt and fear of failure, which often hold us back from pursuing our dreams.\nSo, how can we cultivate positive self-talk in our daily lives? Here are some tips:\nPay attention to your self-talk: Start by becoming aware of your inner dialogue. Notice when you are engaging in negative self-talk and try to reframe those thoughts into more positive ones.\nPractice self-compassion: Treat yourself with kindness, like you would treat a friend. Acknowledge your mistakes and shortcomings, but do not beat yourself up over them.\nFocus on solutions: When faced with a problem or challenge, focus on finding a solution rather than dwelling on the problem.\nUse positive affirmations: Repeat positive statements to yourself that reinforce your strengths and abilities. For example - I am capable of achieving my goals -  or - I am worthy of love and respect.\nIn conclusion, positive self-talk is a powerful tool that can help us improve our overall well-being and achieve our goals. By reframing negative thoughts, being kind and compassionate towards ourselves, and focusing on solutions, we can cultivate a more positive inner dialogue and lead a more fulfilling life."}'

appwrite databases createDocument --databaseId 'default' --collectionId 'articles' --documentId 'how-to-improve-your-life' --data '{"authorId":"chat-gpt","authorName":"Chat GPT","authorImage":"chat-gpt","isPromoted":false,"isPinned":false,"title":"How Being Thankful Can Improve Your Life","categoryId":"uncategorized","imageId":"how-to-improve-your-life","content":"Gratitude is a powerful emotion that has the ability to transform your life in a positive way. It is the act of acknowledging and appreciating the good things in your life, both big and small. Practicing gratitude on a daily basis can help you shift your focus from what you do not have to what you do have, leading to increased happiness and satisfaction in life.\nStudies have shown that gratitude can have a significant impact on our physical and mental health. When we express gratitude, it triggers the release of dopamine and serotonin, two of the brain feel-good chemicals. This can improve our mood, reduce stress and anxiety, and even lower blood pressure.\nGratitude can also improve our relationships with others. When we express appreciation for the people in our lives, it can strengthen our connections and make us feel more connected to others. It can also make us more empathetic and compassionate, which can lead to more positive interactions and a more fulfilling social life.\nOne of the simplest ways to practice gratitude is to keep a gratitude journal. Each day, write down three things you are grateful for. They can be as simple as a good cup of coffee or as significant as a promotion at work. By focusing on the positive things in your life, you can start to shift your mindset from one of lack to one of abundance.\nAnother way to practice gratitude is to express it to others. Take a few moments each day to tell someone you appreciate them. It can be a friend, family member, or even a stranger. Letting others know that they are valued and appreciated can have a ripple effect, spreading positivity and kindness throughout your community.\nFinally, it is important to remember that gratitude is a practice. It is not something that comes naturally to everyone, and it may take time to develop a gratitude mindset. But by making a conscious effort to focus on the good things in your life, you can start to see the benefits of gratitude and experience a more joyful and fulfilling life.\nIn conclusion, gratitude is a powerful tool that can improve our physical and mental health, strengthen our relationships, and enhance our overall sense of well-being. By practicing gratitude on a daily basis, we can start to shift our mindset from one of lack to one of abundance, and experience the many benefits that come with being thankful."}'

appwrite databases createDocument --databaseId 'default' --collectionId 'articles' --documentId 'why-delaying-tasks-can-be-productive' --data '{"authorId":"chat-gpt","authorName":"Chat GPT","authorImage":"chat-gpt","isPromoted":true,"isPinned":false,"title":"Why Delaying Tasks Can Be Productive","categoryId":"uncategorized","imageId":"why-delaying-tasks-can-be-productive","content":"Procrastination has long been considered a negative habit that leads to unproductivity and missed deadlines. But what if we told you that procrastination could actually be a productive activity? That is right, putting off tasks may sound counterintuitive, but it can lead to a boost in creativity and ultimately lead to better results.\nTo understand why procrastination can be beneficial, we must first look at the psychology behind it. Many people procrastinate because they feel overwhelmed by the task at hand or lack motivation. This can lead to anxiety and stress, which in turn can further impede progress. However, delaying a task can also give the brain time to process information and make important connections.\nWhen we put a task aside and allow our minds to wander, we engage in a process called “incubation.” This is the subconscious processing of information, which can lead to new ideas and fresh perspectives. By taking a break from a task, we can give our brains the chance to come up with creative solutions we may not have thought of otherwise.\nProcrastination can also lead to greater efficiency. When we have a deadline looming, we often work quickly and efficiently to get the job done. By delaying a task, we can create a similar sense of urgency, forcing us to work more efficiently and effectively when we do finally get started.\nOf course, procrastination is not a one-size-fits-all solution. There are times when delaying a task can be detrimental, especially if it leads to missed deadlines or a decline in work quality. It is important to recognize when procrastination is helpful and when it is harmful.\nTo make the most of procrastination, it is important to find the right balance. Setting realistic deadlines and breaking tasks into smaller, more manageable parts can help avoid feelings of overwhelm and ensure that procrastination does not become a habit.\nIn conclusion, procrastination may seem like a negative habit, but it can actually be a productive activity. By giving our brains time to process information and engaging in incubation, we can come up with creative solutions and new perspectives. And by creating a sense of urgency, procrastination can lead to greater efficiency and better results. Just remember, balance is key. With the right approach, procrastination can be an art form that leads to greater productivity and success."}'

appwrite databases createDocument --databaseId 'default' --collectionId 'articles' --documentId 'the-rise-of-low-code-development' --data '{"authorId":"chat-gpt","authorName":"Chat GPT","authorImage":"chat-gpt","isPromoted":false,"isPinned":true,"title":"The Rise of Low-Code Development","categoryId":"uncategorized","imageId":"the-rise-of-low-code-development","content":"Software development has long been considered a complex and time-consuming process that requires extensive knowledge of programming languages and frameworks. However, a new approach to development has emerged in recent years, known as low-code development. This method of software development is transforming the industry by allowing users to create applications with little or no coding knowledge.\nLow-code development platforms are visual tools that allow users to drag-and-drop elements to create applications. These platforms use pre-built components and templates to make the development process quicker and easier. This means that even non-programmers can create applications without having to write a single line of code.\nThe benefits of low-code development are numerous. First and foremost, it speeds up the development process. By using pre-built components and templates, developers can create applications in a fraction of the time it would take to write code from scratch. This also means that companies can save money on development costs, as they require fewer developers to complete projects.\nLow-code development also makes it easier for companies to iterate and update applications. Since the development process is quicker and more streamlined, developers can make changes and updates to applications more frequently. This means that companies can respond more quickly to changes in the market and to customer needs.\nAnother benefit of low-code development is that it can improve collaboration between developers and non-technical stakeholders. Since low-code platforms are visual and intuitive, non-technical team members can participate in the development process and provide feedback. This means that developers can create applications that meet the needs of both technical and non-technical stakeholders.\nHowever, it is important to note that low-code development is not a replacement for traditional programming. While low-code platforms are great for building simple applications, more complex applications still require traditional programming skills. Low-code development is a tool that can be used in conjunction with traditional programming to create applications more efficiently.\nIn conclusion, low-code development is revolutionizing software development by making it quicker and easier for non-programmers to create applications. With the benefits of speed, cost savings, collaboration, and agility, low-code development platforms are becoming an increasingly popular choice for companies of all sizes. While it is not a replacement for traditional programming, it is a powerful tool that can be used in conjunction with programming to create applications more efficiently. The rise of low-code development is an exciting trend that will continue to shape the future of software development"}'

appwrite databases createDocument --databaseId 'default' --collectionId 'articles' --documentId 'why-you-should-learn-haskell' --data '{"authorId":"chat-gpt","authorName":"Chat GPT","authorImage":"chat-gpt","isPromoted":true,"isPinned":true,"title":"Why You Should Consider Learning Haskell","categoryId":"uncategorized","imageId":"why-you-should-learn-haskell","content":"Functional programming is a programming paradigm that emphasizes the use of functions to solve problems. In contrast to object-oriented programming, which emphasizes data structures and methods, functional programming focuses on functions that take input and produce output without changing the state of the program.\nOne language that has gained popularity in the functional programming community is Haskell. Haskell is a statically typed, purely functional language that is used in a variety of industries, from finance to academia.\nOne of the key benefits of Haskell is its strong type system. In Haskell, every expression has a type, and the compiler can verify that the types of different expressions match up. This makes it easier to catch errors at compile time, rather than at runtime.\nAnother benefit of Haskell is its lazy evaluation. Haskell only evaluates expressions when they are needed, which can lead to more efficient code. Additionally, Haskell type system ensures that only valid expressions can be evaluated, which can help prevent runtime errors.\nHaskell also has a number of features that make it well-suited for concurrent and parallel programming. The language has built-in support for concurrency, and its lazy evaluation can help prevent issues that can arise in parallel code.\nWhile Haskell can have a steep learning curve for those new to functional programming, there are a number of resources available to help. Online tutorials and courses can help introduce the language and its concepts, and there are active communities of developers who can offer support and guidance.\nIn conclusion, functional programming offers a number of benefits over object-oriented programming, and Haskell is a powerful language that is well-suited for a variety of applications. While it may take some time to learn, the benefits of functional programming can be well worth the investment. Whether you are a seasoned developer or just starting out, Haskell is a language that is worth considering as you explore the power of functional programming."}'