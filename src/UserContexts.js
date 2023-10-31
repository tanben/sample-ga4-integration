const { faker } = require("@faker-js/faker");

const UserContexts = [
  {
    className: "mImage1",
    context: {
      kind: "multi",
      user: {
        key: "2919c67e-b076-4154-95c5-f99084df77ec",
        name: "Wendell Stroman",
        state: "Kentucky",
        city: "Hendersontown",
        country: "Romania",
      },
      subscription: {
        key: "enterprise",
      },
      application: {
        key: "bluelightning",
        version: "3.7.6",
      },
      department: {
        name: "Baby",
        key: "baby",
        group: "dark-launcher",
      },
      company: {
        name: "Kemmer Inc",
        key: "kemmer-inc",
      },
    },
  },
  {
    className: "fImage1",
    context: {
      kind: "multi",
      user: {
        key: "6d7dcce6-8792-4844-afb9-b5e2a713b950",
        name: "Shirley Bosco",
        state: "Connecticut",
        city: "South Tristian",
        country: "Pakistan",
      },
      subscription: {
        key: "basic",
      },
      application: {
        key: "autobahn",
        version: "4.8.2",
      },
      department: {
        name: "Grocery",
        key: "grocery",
        group: "light-launcher",
      },
      company: {
        name: "Carroll - Towne",
        key: "carroll-towne",
      },
    },
  },
  {
    className: "mImage2",
    context: {
      kind: "multi",
      user: {
        key: "efc4a048-c929-434c-801d-f5a20c33b559",
        name: "Dale Jacobson",
        state: "Virginia",
        city: "East Wendellworth",
        country: "Kiribati",
      },
      subscription: {
        key: "basic",
      },
      application: {
        key: "electfast",
        version: "2.3.4",
      },
      department: {
        name: "Outdoors",
        key: "outdoors",
        group: "dark-launcher",
      },
      company: {
        name: "O'Keefe - Abbott",
        key: "o-keefe-abbott",
      },
    },
  },
  {
    className: "fImage2",
    context: {
      kind: "multi",
      user: {
        key: "37b0af82-0bf4-495b-87b7-3109cb0eed3f",
        name: "Sherri Hammes",
        state: "Nevada",
        city: "Auerborough",
        country: "Italy",
      },
      subscription: {
        key: "free",
      },
      application: {
        key: "autobahn",
        version: "3.6.1",
      },
      department: {
        name: "Tools",
        key: "tools",
        group: "light-launcher",
      },
      company: {
        name: "Strosin, Cormier and Daugherty",
        key: "strosin-cormier-and-daugherty",
      },
    },
  },
  {
    anonymous: true,
    className: "",
    context: {
      kind: "multi",
      user: {
        key: "92d9cb8a-6e7d-48cc-abb0-7e75c918fc23",
        name: "Calvin Richardson",
        state: "Nevada",
        city: "Gutmannstead",
        country: "El Salvador",
        anonymous: true,
      },
      subscription: {
        key: "enterprise",
      },
      application: {
        key: "bluelightning",
        version: "3.7.6",
      },
      department: {
        name: "Baby",
        key: "baby",
        group: "none",
      },
      company: {
        name: "Kemmer Inc",
        key: "kemmer-inc",
      },
    },
  },
];

function getAnonymousUsers(count = 1) {
  const anonUsers = UserContexts.filter(
    ({ context }) => context.user.anonymous === true
  );
  return anonUsers.slice(0, count);
}

function createRandomUser(anonymous = false) {
  const user = {
    kind: "multi",
    user: {
      key: faker.string.uuid(),
      name: faker.person.fullName(),
      state: faker.location.state(),
      city: faker.location.city(),
      country: faker.location.country(),
      anonymous,
    },
    subscription: {
      key: faker.helpers.arrayElement(["free", "basic", "pro", "enterprise"]),
    },
    application: {
      key: faker.helpers.arrayElement([
        "autobahn",
        "electfast",
        "bluelightning",
      ]),
      version: faker.system.semver(),
    },
    department: createKeyFromName(faker.commerce.department()),
    company: createKeyFromName(faker.company.name()),
  };

  // randomized user group
  // user.department.group = faker.helpers.arrayElement([
  //   "dark-launcher",
  //   "light-launcher",
  //   "none",
  // ]);
  user.department.group = "none";

  return user;
}
function createKeyFromName(name) {
  const key = name.toLocaleLowerCase().replaceAll(/\W+/g, "-");
  return { name, key };
}

function createDebugDetails(context) {
  const details = {
    name: context.user.name,
    userKey: context.user.key,
    anonymous: context.user.anonymous,
    group: context.department.group,
    details: JSON.stringify(context, null, 2),
  };
  // console.log(`createDebugDetails =${details}`);
  return details;
}
export {
  UserContexts,
  getAnonymousUsers,
  createRandomUser,
  createDebugDetails,
};
