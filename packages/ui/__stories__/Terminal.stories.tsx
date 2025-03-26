import React from 'react'

import { Terminal } from '../src/Terminal'
import styles from '../src/Terminal.module.scss'

export default {
  title: 'Components/Terminal',
  component: Terminal,
}

const onExecute = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return ['testRes']
}

export const Default = () => <Terminal onExecute={onExecute} autoFocusInitial={false} />

export const WithHistory = () => (
  <Terminal
    onExecute={onExecute}
    initialExecutionHistory={[
      {
        command: 'test1',
        res: ['testRes1-1', 'testRes1-2'],
      },
      {
        command: 'testError',
        error: 'testErrorRes',
        prompt: 'darth@empire',
      },
      {
        command: 'test2',
        res: ['testRes2-1', 'testRes2-2', 'testRes2-3'],
        prompt: 'luke@republic',
      },
    ]}
  />
)

export const WithInitialCommand = () => <Terminal onExecute={onExecute} initialCommand="blow up death star" autoFocusInitial={false} />

export const WithPrompt = () => (
  <Terminal onExecute={onExecute} prompt="luke@republic:" initialCommand="blow up death star" autoFocusInitial={false} />
)

export const WithInitialCommandHover = () => (
  <Terminal onExecute={onExecute} initialCommand="blow up death star" inputClassName={styles.hover} autoFocusInitial={false} />
)

export const WithInitialCommandFocus = () => (
  <Terminal onExecute={onExecute} initialCommand="blow up death star" inputClassName={styles.focus} autoFocusInitial={false} />
)

export const WithWelcomeMessage = () => (
  <Terminal onExecute={onExecute} welcomeMessage="Hello Luke!!!" initialCommand="blow up death star" autoFocusInitial={false} />
)

export const WithInitialCommandLoading = () => (
  <Terminal onExecute={onExecute} initialCommand="blow up death star" initialLoading autoFocusInitial={false} />
)

const mcHelpResponse =
  "Commands:\n-- General commands\necho true|false                      //turns on/off echo of commands (default false)\nsilent true|false                    //turns on/off silent of command output (default false)\n#<number> <command>                  //repeats <number> time <command>, replace $i in <command> with current iteration (0..<number-1>)\n&<number> <command>                  //forks <number> threads to execute <command>, replace $t in <command> with current thread number (0..<number-1>\n     When using #x or &x, is is advised to use silent true as well.\n     When using &x with m.putmany and m.removemany, each thread will get a different share of keys unless a start key index is specified\njvm                                  //displays info about the runtime\nwho                                  //displays info about the cluster\nwhoami                               //displays info about this cluster member\nns <string>                          //switch the namespace for using the distributed data structure name  <string> (e.g. queue/map/set/list name; defaults to \"default\")\n@<file>                              //executes the given <file> script. Use '//' for comments in the script\n\n-- Queue commands\nq.offer <string>                     //adds a string object to the queue\nq.poll                               //takes an object from the queue\nq.offermany <number> [<size>]        //adds indicated number of string objects to the queue ('obj<i>' or byte[<size>]) \nq.pollmany <number>                  //takes indicated number of objects from the queue\nq.iterator [remove]                  //iterates the queue, remove if specified\nq.size                               //size of the queue\nq.clear                              //clears the queue\n\n-- Set commands\ns.add <string>                       //adds a string object to the set\ns.remove <string>                    //removes the string object from the set\ns.addmany <number>                   //adds indicated number of string objects to the set ('obj<i>')\ns.removemany <number>                //takes indicated number of objects from the set\ns.iterator [remove]                  //iterates the set, removes if specified\ns.size                               //size of the set\ns.clear                              //clears the set\n\n-- Lock commands\nlock <key>                           //same as Hazelcast.getCPSubsystem().getLock(key).lock()\ntryLock <key>                        //same as Hazelcast.getCPSubsystem().getLock(key).tryLock()\ntryLock <key> <time>                 //same as tryLock <key> with timeout in seconds\nunlock <key>                         //same as Hazelcast.getCPSubsystem().getLock(key).unlock()\n\n-- Map commands\nm.put <key> <value>                  //puts an entry to the map\nm.remove <key>                       //removes the entry of given key from the map\nm.get <key>                          //returns the value of given key from the map\nm.putmany <number> [<size>] [<index>]//puts indicated number of entries to the map ('key<i>':byte[<size>], <index>+(0..<number>)\nm.removemany <number> [<index>]      //removes indicated number of entries from the map ('key<i>', <index>+(0..<number>)\n     When using &x with m.putmany and m.removemany, each thread will get a different share of keys unless a start key <index> is specified\nm.keys                               //iterates the keys of the map\nm.values                             //iterates the values of the map\nm.entries                            //iterates the entries of the map\nm.iterator [remove]                  //iterates the keys of the map, remove if specified\nm.size                               //size of the map\nm.localSize                          //local size of the map\nm.clear                              //clears the map\nm.destroy                            //destroys the map\nm.lock <key>                         //locks the key\nm.tryLock <key>                      //tries to lock the key and returns immediately\nm.tryLock <key> <time>               //tries to lock the key within given seconds\nm.unlock <key>                       //unlocks the key\nm.stats                              //shows the local stats of the map\n\n-- MultiMap commands\nmm.put <key> <value>                  //puts an entry to the multimap\nmm.get <key>                          //returns the value of given key from the multimap\nmm.remove <key>                       //removes the entry of given key from the multimap\nmm.size                               //size of the multimap\nmm.clear                              //clears the multimap\nmm.destroy                            //destroys the multimap\nmm.iterator [remove]                  //iterates the keys of the multimap, remove if specified\nmm.keys                               //iterates the keys of the multimap\nmm.values                             //iterates the values of the multimap\nmm.entries                            //iterates the entries of the multimap\nmm.lock <key>                         //locks the key\nmm.tryLock <key>                      //tries to lock the key and returns immediately\nmm.tryLock <key> <time>               //tries to lock the key within given seconds\nmm.unlock <key>                       //unlocks the key\nmm.stats                              //shows the local stats of the multimap\n\n-- List commands:\nl.add <string>                        //adds a string object to the list\nl.add <index> <string>                //adds a string object as an item with given index in the list\nl.contains <string>                   //checks if the list contains a string object\nl.remove <string>                     //removes a string object from the list\nl.remove <index>                      //removes the item with given index from the list\nl.set <index> <string>                //sets a string object to the item with given index in the list\nl.iterator [remove]                   //iterates the list, remove if specified\nl.size                                //size of the list\nl.clear                               //clears the list\n\n-- IAtomicLong commands:\na.get                                 //returns the value of the atomic long\na.set <long>                          //sets a value to the atomic long\na.inc                                 //increments the value of the atomic long by one\na.dec                                 //decrements the value of the atomic long by one\n\n-- Executor Service commands:\nexecute <echo-input>                                     //executes an echo task on random member\nexecuteOnKey <echo-input> <key>                          //executes an echo task on the member that owns the given key\nexecuteOnMember <echo-input> <memberIndex>               //executes an echo task on the member with given index\nexecuteOnMembers <echo-input>                            //executes an echo task on all of the members\ne<threadcount>.simulateLoad <task-count> <delaySeconds>  //simulates load on executor with given number of thread (e1..e16)\n\n"

export const HTMLResponse = () => (
  <Terminal
    onExecute={onExecute}
    initialExecutionHistory={[
      {
        command: 'help',
        res: [mcHelpResponse],
        prompt: '127.0.0.1:5701',
      },
    ]}
  />
)
