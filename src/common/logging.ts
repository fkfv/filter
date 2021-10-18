const Log = (groupName: string, groupMembers: {
  [name: string]: any|any[]
} = {}) => {
  console.group(groupName);
  Object.entries(groupMembers).forEach(([name, value]) => {
    if (Array.isArray(value)) {
      const [format, ...rest] = value;
      console.log(`  %c%s: ${format}`, 'color: gray', name, ...rest);
    } else {
      console.log(`  %c%s: %c${value}`, 'color: gray', name, 'color: green');
    }
  });
  console.groupEnd();
};

export {Log};
